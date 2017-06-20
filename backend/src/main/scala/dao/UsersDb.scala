package dao

import config.DbStrategy
import doobie.imports._
import doobie.postgres.pgtypes._
import fs2.Task
import models.{User, UserAuthCode}
import org.log4s.getLogger

case class UsersDb(transactorTask: Task[Transactor[Task]])(implicit val dbStrategy: DbStrategy) {
  private[this] val logger = getLogger

  implicit val strategy = dbStrategy.strategy

  object sql {
    def readUsers(): Query0[User] =
      sql"""
            select user_uuid, user, email, password_hash from users
        """.query[User]

    // add batch to delete these
    def insertAuthCode(ac: UserAuthCode): Update0 =
      sql"""
            insert into auth_codes
              (user_uuid, redirect_url, auth_code)
            values
              (${ac.userUuid}, ${ac.redirectUrl}, crypt(${ac.authCode}, gen_salt('bf', 15)))
        """.update

    def deleteAuthCode(ac: UserAuthCode): Update0 =
      sql"""
            delete from auth_codes
            where auth_code = ${ac.authCode}
        """.update

    def expireAuthCode(ac: UserAuthCode): Update0 =
      sql"""
            update auth_codes
            set expired = true
            where auth_code = ${ac.authCode}
        """.update

    def readAuthCode(ac: UserAuthCode): Query0[Boolean] =
      sql"""
            select
              expired = false and auth_code = crypt(${ac.authCode}, gen_salt('bf', 15))
            from auth_codes
        """.query[Boolean]
  }

  object io {
    def getUsers() =
      for {
        transactor <- transactorTask
        usersTask <- Task.start(sql.readUsers().list.transact(transactor))
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
      sql.readAuthCode(ac).unique.transact(transactor).map { isCodeValid =>
        if (isCodeValid) {
          sql.deleteAuthCode(ac).run.transact(transactor).map(_ => true)
        } else {
          Task.now(false)
        }
      }
    }

    def isAuthCodeValid(ac: UserAuthCode) = {
      for {
        transactor <- transactorTask
        isCodeValidTask <- Task.start(compareAndDeleteAuthCode(transactor, ac))
        isCodeValid <- isCodeValidTask
      } yield isCodeValid
    }
  }

  def getUsers() =
    io.getUsers()

  def insertAuthCode(ac: UserAuthCode) =
    io.insertAuthCode(ac)

  def compareAuthCode(ac: UserAuthCode) =
    io.isAuthCodeValid(ac)
}
