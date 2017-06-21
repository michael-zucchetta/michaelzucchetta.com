package routes

import fs2.{Strategy, Task}
import io.circe.generic.extras.auto._
import org.http4s._
import org.http4s.util.CaseInsensitiveString
import org.http4s.circe._
import org.http4s.dsl._
import org.log4s.getLogger
import services.{AuthHandler, AuthService, AuthenticationRequest}

import scalaoauth2.provider.AuthorizationRequest

case class AuthoredRoutes(authService: AuthService) {
  private[this] val logger = getLogger


  def routes(request: Request) = request match {
    case req@POST -> Root / "authenticate" =>
      logger.info("authenticate")
      for {
        authenticationRequest <- request.as(jsonOf[AuthenticationRequest])
        authCodeEither <- authService.userAuthentication(authenticationRequest)
        response <- returnResult(authCodeEither)
      } yield response
    case req@POST -> Root / "auth" =>
      // will use http4s authedservice
      import scala.concurrent.ExecutionContext.Implicits.global
      implicit val strategy = Strategy.fromFixedDaemonPool(2)

      val headersAsMap = req.headers.toVector.map(header => header.name.toString -> Seq(header.value)).toMap
      val parametersAsMap = req.multiParams
      logger.info(s"${headersAsMap}")
      for{
        authResult <- Task.fromFuture(authService.tokenEndpoint.handleRequest(new AuthorizationRequest(headersAsMap, parametersAsMap), AuthHandler()))
        response <- NotImplemented("yet")
      } yield {
        logger.info(s"${authResult match {case Left(s) => logger.info(s"ohi ohi ${s.description -> s.errorType}");s}}, ${Thread.currentThread().getStackTrace().mkString("\n")}")
        response
      }

    // GrantHandler.issueAccessToken(services.AuthService)
  }

  def websiteService: HttpService = Service {
    case req =>
      val host = req.headers.get(CaseInsensitiveString("host"))
      logger.info(s"Host is $host")
      routes(req)
  }
}
