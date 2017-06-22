package dao

import config.DbStrategy
import doobie.imports._
import doobie.postgres.pgtypes._
import fs2.Task
import models.{User, UserAuthCode}
import org.log4s.getLogger
import java.time.Instant
import java.util.UUID

case class UsersDb(transactorTask: Task[Transactor[Task]])(implicit val dbStrategy: DbStrategy) {
  private[this] val logger = getLogger

  implicit val strategy = dbStrategy.strategy

  object sql {
    private def crypt(value: String) =
      fr"""crypt($value, gen_salt('bf', 15))"""

    def readUsers(): Query0[User] =
      sql"""
            select user_uuid, user, email, client_id, ''::varchar as secret_client_id
            from users
        """.query[User]

    def readAuthCodes(): Query0[UserAuthCode] =
      sql"""
            select user_uuid, timestamp_inserted, auth_code, redirect_url
            from auth_codes
        """.query[UserAuthCode]

    // add batch to delete these
    def insertAuthCode(ac: UserAuthCode): Update0 =
      (fr"""
            insert into auth_codes
              (user_uuid, redirect_url, auth_code)
            values
              (${ac.userUuid}, ${ac.redirectUrl},""" ++ crypt(ac.authCode) ++
              fr""")""").update

    def deleteAuthCode(authCode: String): Update0 =
      sql"""
            delete from auth_codes
            where auth_code = ${authCode}
        """.update

    def expireAuthCode(ac: UserAuthCode): Update0 =
      sql"""
            update auth_codes
            set expired = true
            where user_uuid = ${ac.userUuid} and expired = false
        """.update

    def readAuthCode(ac: UserAuthCode): Query0[Boolean] =
      (fr"""
            select
              user_uuid = ${ac.userUuid} and expired = false and auth_code = crypt(${ac.authCode}, auth_code)
             from auth_codes
        """).query[Boolean]

    def authenticateUser(username: String, password: String): Query0[Boolean] =
       (fr"""
             select u.username = $username and u.password_hash = crypt($password, u.password_hash)
             from users u"""
         ).query[Boolean]

    def getUserUuidFromUsername(username: String): Query0[UUID] = {
      sql"""
            select user_uuid
            from users
            where
              username = $username
        """.query[UUID]
    }

    def getUserByAuthCode(code: String): Query0[User] =
      (fr"""
            select u.user_uuid, u.username, u.email, u.client_id, ''::varchar as secret_client_id
            from users u inner join auth_codes ac on u.user_uuid = ac.user_uuid
            where ac.auth_code = crypt($code, ac.auth_code) and expired = false"""
        ).query[User]
  }

  object io {
    def getUsers() =
      for {
        transactor <- transactorTask
        usersTask <- Task.start(sql.readUsers().vector.transact(transactor))
        users <- usersTask
      } yield users

    def insertAuthCode(ac: UserAuthCode) = {
      val expireIO = sql.expireAuthCode(ac).run
      val insertIO = sql.insertAuthCode(ac).run
      val expireAndInsertIO = expireIO |+| insertIO
      for {
        transactor <- transactorTask
        expireAndInsertTask <- Task.start(expireAndInsertIO.transact(transactor))
        numOfRowsAltered <- expireAndInsertTask
      } yield {
        logger.info(s"N. rows altered $numOfRowsAltered for user with uuid ${ac.userUuid}")
        numOfRowsAltered
      }
    }

    private def compareAndDeleteAuthCode(transactor: Transactor[Task], ac: UserAuthCode) = {
      sql.readAuthCode(ac).list.transact(transactor).map { isCodeValidOpt =>
        val isCodeValid = isCodeValidOpt.headOption.getOrElse(false)
        if (isCodeValid) {
          sql.deleteAuthCode(ac.authCode).run.transact(transactor).map(_ => true)
        } else {
          Task.now(false)
        }
      }
    }

    def isAuthCodeValid(ac: UserAuthCode) = {
      for {
        transactor <- transactorTask
        isCodeValidTask <- compareAndDeleteAuthCode(transactor, ac)
        isCodeValid <- isCodeValidTask
      } yield isCodeValid
    }

    def authenticateUser(username: String, password: String) = {
      for {
        transactor <- transactorTask
        authenticationResultTask <- Task.start(sql.authenticateUser(username, password).unique.transact(transactor))
        authenticationResult <- authenticationResultTask
      } yield authenticationResult
    }

    def getUserUuid(username: String) = {
      for {
        transactor <- transactorTask
        userUuidTask <- Task.start(sql.getUserUuidFromUsername(username).unique.transact(transactor))
        userUuid <- userUuidTask
      } yield userUuid
    }

    def deleteAuthCode(authCode: String) = {
      for {
        transactor <-transactorTask
        resultTask <- Task.start(sql.deleteAuthCode(authCode).run.transact(transactor))
        result <- resultTask
      } yield result
    }

    def compareAuthCode(ac: UserAuthCode) = {
      for {
        transactor <- transactorTask
        resultTask <- Task.start(sql.readAuthCode(ac).unique.transact(transactor))
        result <- resultTask
      } yield result
    }

    def getAuthCodes() =
      for {
        transactor <- transactorTask
        authCodesTask <- Task.start(sql.readAuthCodes().list.transact(transactor))
        authCodes <- authCodesTask
      } yield authCodes

    def getUserByAuthCode(code: String) =
      for {
        transactor <- transactorTask
        userTask <- Task.start(sql.getUserByAuthCode(code).list.transact(transactor))
        user <- userTask
      } yield user.headOption

  }

  def getUsers() =
    io.getUsers()

  def insertAuthCode(ac: UserAuthCode) =
    io.insertAuthCode(ac)

  def compareAuthCode(ac: UserAuthCode) =
    io.isAuthCodeValid(ac)

  def authenticateUser(username: String, password: String, redirectUrl: String) = {
    io.authenticateUser(username, password).flatMap {
      case true =>
        for {
          userUuid <- io.getUserUuid(username)
          authenticationCode = s"${UUID.randomUUID()}-${UUID.randomUUID()}"
          userAuthCode = UserAuthCode(userUuid, Instant.now(), authenticationCode, s"$redirectUrl$authenticationCode")
          rowInserted <- io.insertAuthCode(userAuthCode)
        } yield {
          logger.info(s"Inserted $rowInserted rows")
          Right(userAuthCode)
        }
      case false =>
        Task.now(Left(false))
    }
  }

  def deleteAuthCode(authCode: String) =
    io.deleteAuthCode(authCode)

  def getUserByAuthCode(code: String) = {
    io.getUserByAuthCode(code)
  }
}
