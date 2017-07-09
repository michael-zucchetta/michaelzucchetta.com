package routes

import java.util.Base64
import java.nio.charset.StandardCharsets

import io.circe.generic.extras.auto._
import org.http4s._
import org.http4s.util.CaseInsensitiveString
import org.http4s.circe._
import org.http4s.dsl._
import org.log4s.getLogger
import services.{AuthService, AuthenticationRequest}

import scalaoauth2.provider.{ProtectedResource, ProtectedResourceRequest}

case class AuthoredRoutes(authService: AuthService) {
  private[this] val logger = getLogger

  def routes(request: Request) = request match {
    case req@POST -> Root / "login" =>

      logger.info(s"authenticate ${request.headers.map(s => s.toRaw.name.toString() + s.toRaw.value.toString)}")
      for {
        authenticationRequest <- request.as(jsonOf[AuthenticationRequest])
        _ = logger.info(s"authenticating username: ${authenticationRequest.username}")
        // set Basic Base64 for clientId
        authCodeEither <- authService.userAuthentication(authenticationRequest)
        response <- returnResult(authCodeEither.right.map(_._2))
      } yield authCodeEither match {
          case Left(_) =>
            response
          case Right(authCode) =>
            val clientId = authCode._1
            val header = Header("Authorization", s"Basic ${Base64.getEncoder.encodeToString(s"${clientId}:".getBytes(StandardCharsets.UTF_8))}")
            response.putHeaders(header)
        }
    case req@POST -> Root / "confirm_auth_code" =>
      for {
        response <- Ok("Ok")
        responseKO <- Ok("KO")
        resultAuthorization <- authService.authorizeAuthCode(request)
      } yield {
        logger.info("Authentication code check concluded")
        resultAuthorization match {
          case Right(result) =>
            val authorizationBearer = Header("Authorization", s"Bearer ${result.accessToken}")
            logger.info("bye")
            response
              .putHeaders(authorizationBearer)
          case Left(error) =>
            logger.info (s"Auth code result is ${error.description}")
            responseKO.withStatus(Unauthorized)
        }
      }
    case req@POST -> Root / "auth" =>
      // will use http4s authedservice
      val headers = request.headers.toVector.map(header => header.name.toString() -> Seq(header.value)).toMap

      val protectedResourceRequest = new ProtectedResourceRequest(headers, req.multiParams)
      for {
        response <- Ok("hola")
        result <- authService.isAuthenticated(protectedResourceRequest)
      } yield {
        logger.info(s"Token error: ${result.left.map(_.description)}")
        response
      }
    case req =>
      logger.warn(s"route not found for $req")
      NotFound("Not found")
  }
  // use AuthedService
  // check ProtectedResource oauth2

  def websiteService: HttpService = Service {
    case req =>
      val host = req.headers.get(CaseInsensitiveString("host"))
      logger.info(s"Host is $host")
      routes(req)
  }
}
