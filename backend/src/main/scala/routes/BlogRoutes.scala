package routes

import org.http4s.Request
import org.http4s.dsl._
import org.http4s.circe._
import models._
import org.log4s.getLogger
import services.{AuthService, BlogPostsService}
import io.circe.generic.extras.auto._

case class BlogRoutes(authService: AuthService, blogPostsService: BlogPostsService) {
  private[this] val logger = getLogger

  def routes(request: Request) = request match {
    case req@POST -> Root / "new_post" =>
      // temporary
      for {
        oauthResult <- authService.isAuthenticated(fromHttp4sToProtectedRequest(req))
        blogPostRequest <- request.as(jsonOf[BlogPostRequest])
        serviceResult = oauthResult.map(s => blogPostsService.insertBlogPost(blogPostRequest, s.user.userUuid, s.user.username))
        result <- serviceResult match {
          case Left(oauthError) =>
            logger.warn(s"Error on oath $oauthError")
            Ok("Unathorized").withStatus(Unauthorized)
          case Right(numRowsInserted) =>
            Ok("post inserted successfully")
        }
      } yield result
  }
}
