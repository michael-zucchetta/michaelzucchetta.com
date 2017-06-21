package routes

import fs2.Task
import io.circe.generic.extras.auto._
import org.http4s._
import org.http4s.circe._
import org.http4s.dsl._
import org.http4s.util.CaseInsensitiveString
import org.log4s.getLogger
import services.{GeoPluginService, TrackingService}
import models.TrackingActionRequest


case class PublicRoutes(geoPluginService: GeoPluginService, trackingService: TrackingService) {
  private[this] val logger = getLogger

  def routes(request: Request): Task[MaybeResponse] = request match {
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
        geoDataEither <- geoPluginService.getGeoLocalizationByIp(ipAddress)
        result <- Task.delay( geoDataEither.map( geoData => trackingService.trackAccessAction(trackingActionRequest, geoData, req.headers.get(CaseInsensitiveString("referer"))).unsafeRun() ) )
        response <- returnResult(result)
      } yield response
    case req =>
      logger.warn(s"rout not found for $req")
      NotFound("Not found")
  }

  def websiteService: HttpService = Service {
    case req =>
      val host = req.headers.get(CaseInsensitiveString("host"))
      logger.info(s"Host is $host")
      routes(req)
  }
}