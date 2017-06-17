import config._
import dao.TrackingDb
import fs2.{Strategy, Stream, Task}
import org.http4s.server.blaze._
import org.http4s.util.StreamApp
import services.{GeoPluginService, TrackingService}
        
object App extends StreamApp {
  
  def httpServer(port: Int, geoPluginService: GeoPluginService, trackingService: TrackingService) = {
    val routes = new Routes(geoPluginService, trackingService)
    BlazeBuilder
      .bindHttp(port, "0.0.0.0")
      //.withSSL()
      .mountService(routes.websiteService, "/")
      .serve
  }

  override def stream(args: List[String]): Stream[Task, Nothing] = {
    //Stream.bracket(httpServer(8080))({ s =>
    //  Stream.eval_(Task.async[Nothing](_ => ())(Strategy.sequential))
    //}, _.shutdown)
    for {
      geoPluginService <- Config.geoPluginServiceStream
      trackingService <- Config.trackingServiceStream
      server <- httpServer(8080, geoPluginService, trackingService)
    } yield server
  }
}
