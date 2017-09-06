package routes

import java.util.UUID

import io.circe.generic.extras.auto._
import io.circe.syntax._
import org.http4s.{HttpService, Request, Service}
import org.http4s.dsl._
import org.http4s.circe._
import models._
import org.log4s.getLogger
import services.{AuthService, PostsService}
import org.http4s.util.CaseInsensitiveString

import scala.util.Try

class PagePostsRoutes(authService: AuthService, postsService: PostsService) {
  private[this] val logger = getLogger

  def routes(request: Request) = request match {
    case req@POST -> Root / "upsert_post" =>
      // temporary
      for {
        oauthResult <- authService.isAuthenticated(fromHttp4sToProtectedRequest(req))
        postRequest <- request.as(jsonOf[PostRequest])
        _ = logger.info(s"Inserting blog post with request $postRequest")
        serviceResult = oauthResult.map(s => postsService.upsertPost(postRequest, s.user.userUuid, s.user.username))
        result <- serviceResult match {
          case Left(oauthError) =>
            logger.warn(s"Error on oath $oauthError")
            Ok("Unauthorized").withStatus(Unauthorized)
          case Right(dataResp) =>
            dataResp.flatMap(data =>
              Ok(data.asJson)
            )
        }
      } yield result

    case req@GET -> Root / "get_by_uuid" =>
      val postUuidOpt = req.params.get("post_uuid")
        .flatMap(uuidString => Try(UUID.fromString(uuidString)).toOption)
      postUuidOpt match {
        case Some(postUuid) =>
          postsService.readPage(postUuid).flatMap {
            case Some(post) =>
              Ok(post.asJson)
            case None =>
              NotFound("Post not found")
          }
        case None =>
          BadRequest("Parameter not valid")
      }
  }

  def websiteService: HttpService = Service {
    case req =>
      val host = req.headers.get(CaseInsensitiveString("host"))
      logger.info(s"Host is $host")
      routes(req)
  }
}