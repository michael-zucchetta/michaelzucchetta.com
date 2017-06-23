package services

import java.util.{Date, UUID}
import java.util.concurrent.ConcurrentHashMap

import dao.UsersDb
import fs2.Task
import models.{User, UserAuthCode}
import org.log4s.getLogger

import scala.concurrent.Future
import scalaoauth2.provider._
import collection.JavaConverters._
import scala.concurrent.duration.DurationInt


case class AuthHandler(usersDb: UsersDb) extends DataHandler[User] {
  private[this] val logger = getLogger

  private[this] val accessTokens = new ConcurrentHashMap[String, AccessToken]().asScala
  private[this] val authInfosByAccessToken = new ConcurrentHashMap[String, AuthInfo[User]]().asScala

  private[this] def makeToken: AccessToken = {
    AccessToken(
      token = s"AT-mz-${UUID.randomUUID()}",
      refreshToken = Some(s"RT-mz-${UUID.randomUUID()}"),
      scope = None,
      lifeSeconds = Some(1.hour.toSeconds),
      createdAt = new Date()
    )
  }

  private[this] val clientsTask: Task[Vector[User]] = usersDb.io.getUsers()
/*    Vector(
    AuthData(
      "user_name",
      "1",
      "",
      "user_auth_code",
      User(UUID.randomUUID(), "John Smith", "", "global")
    )
  )
  */

  override def findAuthInfoByAccessToken(accessToken: AccessToken): Future[Option[AuthInfo[User]]] = {
    Future.successful(authInfosByAccessToken.get(accessToken.token))
  }

  override def findAccessToken(token: String): Future[Option[AccessToken]] = {
    Future.successful(accessTokens.values.find { at: AccessToken => at.token.equals(token) })
  }

  override def validateClient(maybeCredential: Option[ClientCredential], request: AuthorizationRequest): Future[Boolean] = {
    clientsTask.map { clients =>
      logger.info(s"maybe credentials are $maybeCredential")
      maybeCredential match {
        case Some(credentials) =>
          logger.info(s"credentials validation is ${clients(0).clientId} ${clients(0).clientSecret} vs ${credentials.clientId} and ${credentials.clientSecret}")
          val output = clients.exists(client => client.clientId == credentials.clientId && client.clientSecret == credentials.clientSecret.getOrElse(""))
          logger.info(s"credentials validation is $output")
          output
        case None =>
          false
      }
    }.unsafeRunAsyncFuture()
  }

  override def findUser(maybeCredential: Option[ClientCredential], request: AuthorizationRequest): Future[Option[User]] = ???

  override def createAccessToken(authInfo: AuthInfo[User]): Future[AccessToken] = {
    val token = makeToken

    authInfo.clientId.foreach( clientId =>
      accessTokens += clientId -> token
    )
    authInfosByAccessToken += (token.token -> authInfo)

    Future.successful(token)
  }

  override def getStoredAccessToken(authInfo: AuthInfo[User]): Future[Option[AccessToken]] = {
    Future.successful(authInfo.clientId.flatMap(accessTokens.get))
  }

  override def refreshAccessToken(authInfo: AuthInfo[User], refreshToken: String): Future[AccessToken] = ???


  override def findAuthInfoByCode(code: String): Future[Option[AuthInfo[User]]] = {
    logger.info(s"Retrieving authInfo by code")
    for {
      clients <- clientsTask
      _ = logger.info("clients retrieved")
      userOpt <- usersDb.getUserByAuthCode(code)
      _ = logger.info(s"retrieved by auth code $userOpt")
    } yield
      userOpt.map( user =>
        AuthInfo[User](
          user,
          Some(user.clientId),
          Some("global"),
          None
        ))
  }.unsafeRunAsyncFuture()

  import scala.concurrent.ExecutionContext.Implicits.global

  override def deleteAuthCode(code: String): Future[Unit] = {
    logger.info(s"Deleting auth code $code")
    usersDb.deleteAuthCode(code)
      .unsafeRunAsyncFuture()
      .map(numRows => {
        logger.info(s"Deleting $numRows auth codes")
        ()
      })
  }

  override def findAuthInfoByRefreshToken(refreshToken: String): Future[Option[AuthInfo[User]]] = ???
}
