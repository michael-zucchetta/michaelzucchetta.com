  import config._
  import fs2.{Stream, Task}
  import org.http4s.server.blaze._
  import org.http4s.util.StreamApp
  import routes.{AuthoredRoutes, PagePostsRoutes, PublicRoutes}
  import services._

  object App extends StreamApp {

    def httpServer(port: Int, geoPluginService: GeoPluginService, trackingService: TrackingService, blogPostsService: PostsService, authService: AuthService, menuService: MenuService) = {
      val pubRoutes = new PublicRoutes(geoPluginService, trackingService, menuService)
      val authRoutes = new AuthoredRoutes(authService)
      val blogRoutes = new PagePostsRoutes(authService, blogPostsService)
      BlazeBuilder
        .bindHttp(port, "0.0.0.0")
        //.withSSL()
        .mountService(authRoutes.websiteService, "/auth")
        .mountService(pubRoutes.websiteService, "/pub")
        .mountService(blogRoutes.websiteService, "/blog")
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
        blogPostsService <- WebConfig.blogPostsServiceStream
        menuService <- WebConfig.menuServiceStream
        server <- httpServer(9999, geoPluginService, trackingService, blogPostsService, authService, menuService)
      } yield server
    }
  }
