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

  private def getIpAddress(request: Request) = {
    val ipHeaders = Vector("X-Forwarded-For",
      "Proxy-Client-IP",
      "WL-Proxy-Client-IP",
      "HTTP_X_FORWARDED_FOR",
      "HTTP_X_FORWARDED",
      "HTTP_X_CLUSTER_CLIENT_IP",
      "HTTP_FORWARDED",
      "HTTP_VIA",
      "REMOTE_ADDR"
    )
    ipHeaders
      .map(ipHeader => request.headers.get(CaseInsensitiveString(ipHeader)))
      .find {
        case Some(ipAddressHeader) => true
        case None => false
      }.flatten
  }

  def routes(request: Request): Task[MaybeResponse] = request match {
    case req@GET -> Root / "get_geo_data" =>
      logger.info(s"IP address is ${req.headers.get(CaseInsensitiveString("x-forwarded-for"))}")
      // val ipAddressOpt = req.params.get("ip_address")
      val ipAddressOpt = getIpAddress(request).map(_.value)
      for {
        resultEither <- geoPluginService.getGeoLocalizationByIp(ipAddressOpt)
        response <- returnResult(resultEither)
      } yield response
    case req@POST -> Root / "track_action" =>
      for {
        trackingActionRequest <- req.as(jsonOf[TrackingActionRequest])
        ipAddressOpt = trackingActionRequest.ipAddress
        geoDataEither <- geoPluginService.getGeoLocalizationByIp(ipAddressOpt)
        result <- Task.delay( geoDataEither.map( geoData => trackingService.trackAccessAction(trackingActionRequest, geoData, req.headers.get(CaseInsensitiveString("referer"))).unsafeRun() ) )
        response <- returnResult(result)
      } yield response
    case req =>
      logger.warn(s"route not found for $req")
      NotFound("Not found")
  }

  def websiteService: HttpService = Service {
    case req =>
      val host = req.headers.get(CaseInsensitiveString("host"))
      logger.info(s"Host is $host")
      routes(req)
  }
}
