package services

import dao.UsersDb
import fs2.{Strategy, Task}
import models.UserAuthRedirection
import org.http4s.{Request, Response}
import org.http4s.dsl._

import scalaoauth2.provider.{AuthorizationRequest, _}

// see here:
// https://github.com/nulab/play2-oauth2-provider/blob/master/src/main/scala/scalaoauth2/provider/OAuth2Provider.scala

case class AuthenticationRequest(username: String, password: String)

case class AuthService(usersDb: UsersDb) {
  val authHandler = AuthHandler(usersDb)
  // https://github.com/tsuyoshizawa/scala-oauth2-provider-example-skinny-orm/blob/master/app/controllers/OAuthController.scala
  val tokenEndpoint = new TokenEndpoint {
    override val handlers = Map(
      OAuthGrantType.AUTHORIZATION_CODE -> new AuthorizationCode(),
      OAuthGrantType.REFRESH_TOKEN -> new RefreshToken(),
      OAuthGrantType.CLIENT_CREDENTIALS -> new ClientCredentials(),
      OAuthGrantType.PASSWORD -> new Password()
    )
  }

  val baseRedirectUrl = s"/auth/confirm_auth_code?authentication_code="

  def userAuthentication(request: AuthenticationRequest): Task[Either[Response, UserAuthRedirection]] = {
    for {
      authCodeResult <- usersDb.authenticateUser(request.username, request.password, baseRedirectUrl)
      notFoundResp <- NotFound("Username or password are wrong")
      response = authCodeResult.left.map(_ => notFoundResp)
    } yield response.map(userAuthCode => UserAuthRedirection(userAuthCode.redirectUrl))
  }

  def authorizeAuthCode(request: Request) = {
    val code = request.params.get("authentication_code").get
    val redirectUri =  s"/auth/confirm_auth_code?authentication_code=$code"

    val additionalParams = Map("code" -> Seq(code), "redirect_uri" -> Seq(redirectUri), "grant_type" -> Seq("authorization_code"))
    issueAccessToken(authHandler, additionalParams)(request)
  }

  private def toAuthorizationRequest(request: Request, additionalParameters: Map[String, Seq[String]]): AuthorizationRequest = {
    val headers = request.headers.toVector.map(header => header.name.toString() -> Seq(header.value)).toMap
    val params = request.multiParams
    new AuthorizationRequest(headers, params ++ additionalParameters)
  }

  /**
  def issueAccessToken[A, U](handler: AuthorizationHandler[U])(implicit request: Request[A], ctx: ExecutionContext): Future[Result] = {
    tokenEndpoint.handleRequest(request, handler).map {
      case Left(e) => new Status(e.statusCode)(responseOAuthErrorJson(e)).withHeaders(responseOAuthErrorHeader(e))
      case Right(r) => Ok(Json.toJson(responseAccessToken(r))).withHeaders("Cache-Control" -> "no-store", "Pragma" -> "no-cache")
    }
  }
    */

  def issueAccessToken[A, U](handler: AuthorizationHandler[U], additionalParameters: Map[String, Seq[String]])(implicit request: org.http4s.Request) = {
    import scala.concurrent.ExecutionContext.Implicits.global
    implicit val s = Strategy.fromFixedDaemonPool(2)
    val authorizationRequest = toAuthorizationRequest(request, additionalParameters)
    Task.fromFuture {
      tokenEndpoint.handleRequest(authorizationRequest, handler).map {
        case Left(e) => Left(e)
        case Right(result) => Right(result.accessToken)
      }
    }
  }
}