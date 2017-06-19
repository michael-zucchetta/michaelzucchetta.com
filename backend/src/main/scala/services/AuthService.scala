package services

import java.util.Date
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap

import models.User

import scala.concurrent.Future
import scala.concurrent.duration.DurationInt
import scalaoauth2.provider._

import collection.JavaConverters._

case class AuthService() extends DataHandler[User] {
  private[this] case class AuthData(
                                     username: String,
                                     password: String,
                                     clientId: String,
                                     clientSecret: String,
                                     authCode: String,
                                     user: User
                                   )

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

  private[this] val clients: Vector[AuthData] = Vector(
    AuthData(
      "user_name",
      "user_password",
      "user_id",
      "user_secret",
      "user_auth_code",
      User(UUID.randomUUID(), "John Smith", "", "global")
    )
  )

  override def findAuthInfoByAccessToken(accessToken: AccessToken): Future[Option[AuthInfo[User]]] = {
    Future.successful(authInfosByAccessToken.get(accessToken.token))
  }

  override def findAccessToken(token: String): Future[Option[AccessToken]] = {
    Future.successful(accessTokens.values.find { at: AccessToken => at.token.equals(token) })
  }

  override def validateClient(maybeCredential: Option[ClientCredential], request: AuthorizationRequest): Future[Boolean] = {
    val result = maybeCredential match {
      case Some(credentials) =>
        clients.exists (client => client.clientId == credentials.clientId && client.clientSecret == credentials.clientSecret)
      case None =>
        false
    }
    Future.successful(result)
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
    clients.find { case ad => code.equals(ad.authCode) } match {
      case Some(ad) =>
        Future.successful(Some(AuthInfo[User](
          ad.user,
          Some(ad.clientId),
          Some(ad.user.scope),
          None
        )))
      case None => Future.successful(None)
    }
  }
  override def deleteAuthCode(code: String): Future[Unit] = ???

  override def findAuthInfoByRefreshToken(refreshToken: String): Future[Option[AuthInfo[User]]] = ???
}
