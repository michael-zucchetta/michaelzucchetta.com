import config._
import fs2.{Stream, Task}
import org.http4s.server.blaze._
import org.http4s.util.StreamApp
import routes.{AuthoredRoutes, PublicRoutes}
import services.{AuthService, GeoPluginService, TrackingService}
        
object App extends StreamApp {
  
  def httpServer(port: Int, geoPluginService: GeoPluginService, trackingService: TrackingService, authService: AuthService) = {
    val pubRoutes = new PublicRoutes(geoPluginService, trackingService)
    val authRoutes = new AuthoredRoutes(authService)
    BlazeBuilder
      .bindHttp(port, "0.0.0.0")
      //.withSSL()
      .mountService(authRoutes.websiteService, "/auth")
      .mountService(pubRoutes.websiteService, "/pub")
      .serve
  }

  override def stream(args: List[String]): Stream[Task, Nothing] = {
    //Stream.bracket(httpServer(8080))({ s =>
    //  Stream.eval_(Task.async[Nothing](_ => ())(Strategy.sequential))
    //}, _.shutdown)
    for {
      geoPluginService <- WebConfig.geoPluginServiceStream
      trackingService <- WebConfig.trackingServiceStream
      authService <- WebConfig.authServiceStream
      server <- httpServer(8080, geoPluginService, trackingService, authService)
    } yield server
  }
}
