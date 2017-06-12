package models

import java.util.UUID
import java.time.Instant

case class TrackingAction(
                           trackingUuid: UUID = UUID.randomUUID(),
                           actionDate: Instant = Instant.now(),
                           actionType: String,
                           siteReferer: Option[String] = None,
                           provenience: Option[String] = None,
                           ipAddress: String,
                           country: Option[String] = None,
                           city: Option[String] = None
                         )

case class TrackingActionRequest(
                                  ipAddress: Option[String],
                                  provenience: Option[String]
                                )1