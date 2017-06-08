package config

import dao.TrackingDb
import fs2.Task
import io.circe._
import io.circe.syntax._
import io.circe.generic.auto._
import io.circe.generic.extras.Configuration
import models.TrackingActionRequest
import org.http4s._
import org.http4s.dsl._
import org.http4s.circe._
import services.GeoPluginService

case class Routes(geoPluginService: GeoPluginService, trackingDb: TrackingDb) {
  implicit val config: Configuration = Configuration.default.withSnakeCaseKeys

  private def returnResult[T](resultEither: Either[Response, T])(implicit encoder: Encoder[T]): Task[Response] =
    resultEither match {
      case Right(correctResult) =>
        Ok(correctResult.asJson)
      case Left(status) =>
        Task.now(status)
    }

  val websiteService = HttpService {
    case req@GET -> Root / "get_geo_data" =>
      val ipAddress = req.params.get("ip_address").getOrElse("")
      for {
        resultEither <- geoPluginService.getGeoLocalizationByIp(ipAddress)
        response <- returnResult(resultEither)
      } yield response
    case req@POST -> Root / "track_action" =>
      for {
        trackingActionRequest <- req.as(jsonOf[TrackingActionRequest])
        ipAddress = trackingActionRequest.ipAddress.getOrElse("")
        geoData <- geoPluginService.getGeoLocalizationByIp(ipAddress)
        response <- Ok("result")
      } yield response
  }
}