import config._
import fs2.{Stream, Task}
import org.http4s.server.blaze._
import org.http4s.util.StreamApp
import services.{AuthService, GeoPluginService, TrackingService}
        
object App extends StreamApp {
  
  def httpServer(port: Int, geoPluginService: GeoPluginService, trackingService: TrackingService, authService: AuthService) = {
    val routes = new Routes(geoPluginService, trackingService, authService)
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
      authService <- Config.authServiceStream
      server <- httpServer(8080, geoPluginService, trackingService, authService)
    } yield server
  }
}
