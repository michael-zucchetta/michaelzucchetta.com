package services

import java.net.MalformedURLException

import fs2.Task
import org.http4s.client.Client
import models.GeoData
import org.http4s.Status.Successful
import org.log4s.getLogger
import org.http4s._
import org.http4s.dsl._
import org.http4s.circe.jsonOf

case class GeoPluginService(geoPluginUrl: String, client: Client) {
  private[this] val logger = getLogger

  def getGeoLocalizationByIp(ipAddressOpt: Option[String]): Task[Either[Response, GeoData]] = {
    val uri = Uri.fromString(geoPluginUrl) match {
      case Right(uri) =>
        uri.withOptionQueryParam("ip", ipAddressOpt)
      case Left(parseFailure) =>
        logger.error(s"Something wrong with uri $geoPluginUrl: $parseFailure")
        throw new MalformedURLException()
    }

    client.get[Either[Response, GeoData]](uri) {
      case Successful(response) =>
        response.as(jsonOf[GeoData]).map(geoData => Right(geoData))
      case default =>
        logger.error(s"Something went wrong while calling geo localization service ${default.toString()}")
        InternalServerError("Something went wrong").map(error => Left(error))
    }
  }
}
