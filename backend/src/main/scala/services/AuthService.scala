package services

import java.util.Date
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap

import dao.UsersDb
import fs2.{Strategy, Task}
import org.http4s.Response
import org.http4s.dsl._
import models.{User, UserAuthCode}
import org.log4s.getLogger

import scala.concurrent.Future
import scala.concurrent.duration.DurationInt
import scalaoauth2.provider.{AuthorizationRequest, _}
import collection.JavaConverters._

// see here:
// https://github.com/nulab/play2-oauth2-provider/blob/master/src/main/scala/scalaoauth2/provider/OAuth2Provider.scala

case class AuthHandler() extends DataHandler[User] {
  private[this] val logger = getLogger

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
    logger.info(s"maybe credentials are $maybeCredential")
    val result = maybeCredential match {
      case Some(credentials) =>
        logger.info(s"credentials validation is ${clients(0).clientId} ${clients(0).clientSecret} vs ${credentials.clientId} and ${credentials.clientSecret}")
        clients.exists (client => client.clientId == credentials.clientId && client.clientSecret == credentials.clientSecret.get)
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

case class AuthenticationRequest(username: String, password: String)

case class AuthService(usersDb: UsersDb) {
  // https://github.com/tsuyoshizawa/scala-oauth2-provider-example-skinny-orm/blob/master/app/controllers/OAuthController.scala
  val tokenEndpoint = new TokenEndpoint {
    override val handlers = Map(
      OAuthGrantType.AUTHORIZATION_CODE -> new AuthorizationCode(),
      OAuthGrantType.REFRESH_TOKEN -> new RefreshToken(),
      OAuthGrantType.CLIENT_CREDENTIALS -> new ClientCredentials(),
      OAuthGrantType.PASSWORD -> new Password()
    )
  }

  def userAuthentication(request: AuthenticationRequest): Task[Either[Response, String]] = {
    val baseRedirectUrl = s"/auth/confirm_auth_code?authenticationCode="
    for {
      authCodeResult <- usersDb.authenticateUser(request.username, request.password, baseRedirectUrl)
      notFoundResp <- NotFound("Username or password are wrong")
      response = authCodeResult.left.map(_ => notFoundResp)
    } yield response.map(userAuthCode => userAuthCode.redirectUrl)
  }

  private def toAuthorizationRequest(request: org.http4s.Request): AuthorizationRequest = {
    val headers = request.headers.toVector.map(header => header.name.toString() -> Seq(header.value)).toMap
    val params = request.multiParams
    new AuthorizationRequest(headers, params)
  }

  /**
  def issueAccessToken[A, U](handler: AuthorizationHandler[U])(implicit request: Request[A], ctx: ExecutionContext): Future[Result] = {
    tokenEndpoint.handleRequest(request, handler).map {
      case Left(e) => new Status(e.statusCode)(responseOAuthErrorJson(e)).withHeaders(responseOAuthErrorHeader(e))
      case Right(r) => Ok(Json.toJson(responseAccessToken(r))).withHeaders("Cache-Control" -> "no-store", "Pragma" -> "no-cache")
    }
  }
    */

  def issueAccessToken[A, U](handler: AuthorizationHandler[U])(implicit request: org.http4s.Request) = {
    import scala.concurrent.ExecutionContext.Implicits.global
    implicit val s = Strategy.fromFixedDaemonPool(2)
    val authorizationRequest = toAuthorizationRequest(request)
    Task.fromFuture {
      tokenEndpoint.handleRequest(authorizationRequest, handler).map {
        case Left(e) => Left(e)
        case Right(result) => Right(result.accessToken)
      }
    }
  }
}