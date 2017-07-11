package services

import java.util.UUID

import cats.syntax.all._
import dao.TrackingDb
import fs2.Task
import models.{GeoData, TrackingAction, TrackingActionRequest}
import org.mockito.Mockito._
import org.mockito.Matchers._
import org.scalatest.{MustMatchers, WordSpec}
import org.scalatest.concurrent.ScalaFutures
import org.scalatest.mockito.MockitoSugar

class TrackingServiceSpec extends WordSpec with MustMatchers with MockitoSugar with ScalaFutures {
  val trackingDbMock = mock[TrackingDb]
  val trackingService = TrackingService(trackingDbMock)

  val trackingActionRequest = TrackingActionRequest(UUID.randomUUID().toString.some, UUID.randomUUID().toString.some)
  val geoData = GeoData(UUID.randomUUID().toString, UUID.randomUUID().toString.some, UUID.randomUUID().toString.some, UUID.randomUUID().toString.some, UUID.randomUUID().toString.some, None, None)

  when(trackingDbMock.writeTrackingAction(any[TrackingAction])).thenReturn(Task.now(1))
  
  "TrackingService.trackAccessAction" must {
    "return Task[1]" in {
      whenReady(trackingService.trackAccessAction(trackingActionRequest, geoData, None).unsafeRunAsyncFuture()) { response =>
        response must be(1)
      }
    }
  }
}
