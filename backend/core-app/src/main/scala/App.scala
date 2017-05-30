import config._
import fs2.{Strategy, Stream, Task}
import org.http4s.server.blaze._
import org.http4s.util.StreamApp
import services.GeoPluginService
        
object App extends StreamApp {
  
  def httpServer(port: Int, geoPluginService: GeoPluginService) = {
    val routes = new Routes(geoPluginService)
    BlazeBuilder
      .bindHttp(port, "0.0.0.0")
      .mountService(routes.websiteService, "/")
      .serve
  }

  override def stream(args: List[String]): Stream[Task, Nothing] = {
    //Stream.bracket(httpServer(8080))({ s =>
    //  Stream.eval_(Task.async[Nothing](_ => ())(Strategy.sequential))
    //}, _.shutdown)
    for {
      geoPluginService <- Config.geoPluginServiceStream
      server <- httpServer(8080, geoPluginService)
    } yield server
  }
}
