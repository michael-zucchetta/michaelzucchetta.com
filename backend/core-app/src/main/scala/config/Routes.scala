package config

import fs2.Task
import io.circe._
import io.circe.syntax._
import org.http4s._
import org.http4s.dsl._
import org.http4s.circe._
import models.GeoData
import services.GeoPluginService

case class Routes(geoPluginService: GeoPluginService) {

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
  }
}