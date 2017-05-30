package config

import io.circe.syntax._
import org.http4s.HttpService
import org.http4s.dsl._
import models._
import org.http4s.circe._
import services.GeoPluginService

case class Routes(geoPluginService: GeoPluginService) {

  val websiteService = HttpService {
    case req@GET -> Root / "get_geo_data" =>
      Ok(geoPluginService.getGeoLocalizationByIp("SS").map(_.asJson))
  }
}