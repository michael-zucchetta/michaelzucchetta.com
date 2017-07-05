package services

import dao.TrackingDb
import models._
import org.http4s.Header

case class TrackingService(trackingDb: TrackingDb) {
  def trackAccessAction(trackActionRequest: TrackingActionRequest, geoData: GeoData, referer: Option[Header]) = {
    val trackingAction = TrackingAction(
      actionType = "access",
      ipAddress = trackActionRequest.ipAddress.getOrElse("anyonymous"),
      provenience = trackActionRequest.provenience,
      country = geoData.countryName,
      city = geoData.city,
      siteReferer = referer.map(_.value)
    )
    trackingDb.writeTrackingAction(trackingAction)
  }
}
