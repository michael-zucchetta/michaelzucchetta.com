package config

import com.typesafe.config.{ConfigFactory, Config => ConfigFile}
import dao.{BlogPostsDb, TrackingDb, UsersDb}
import doobie.util.transactor.Transactor
import fs2.{Strategy, Stream, Task}
import org.http4s.client.Client
import org.http4s.client.blaze.PooledHttp1Client
import services.{AuthService, BlogPostsService, GeoPluginService, TrackingService}


case class DbStrategy(strategy: Strategy)

object WebConfig {
  val strategy = Strategy.fromFixedDaemonPool(10)

  private def httpClient() = {
    val client = Task.delay(PooledHttp1Client())
    Stream.bracket(client)((c: Client) => Stream.emit(c), (c: Client) => c.shutdown)
  }

  private def geoPluginService(config: ConfigFile, httpClient: Client) = {
    val geoPluginUrl = config.getString("geoplugin.url")
    Stream.eval(Task.delay(GeoPluginService(geoPluginUrl, httpClient)))
  }

  private def transactor(config: ConfigFile) = {
    // val doobieConnectionManager = Task.now(PostgresDao(config))
    val doobieConnectionManager = PostgresDao(config)
    // Stream.bracket(doobieConnectionManager)((d: PostgresDao) => Stream.emit(d.getHikariTransactor()), (d: PostgresDao) => d.releaseConnection())
    Stream.eval(doobieConnectionManager.getHikariTransactor())
  }

  private def dbStrategy(config: ConfigFile): DbStrategy = {
    val threadNumber = config.getOptionInt("db.strategy.threads").getOrElse(2)
    DbStrategy(Strategy.fromFixedDaemonPool(threadNumber))
  }

  private def trackingDb(transactor: Transactor[Task], dbStrategy: DbStrategy) = {
    Stream.eval(Task.delay(TrackingDb(transactor)(dbStrategy)))
  }

  private def blogPostsDb(transactor: Transactor[Task], dbStrategy: DbStrategy) = {
    Stream.eval(Task.delay(BlogPostsDb(transactor)(dbStrategy)))
  }

  private def usersDb(transactor: Transactor[Task], dbStrategy: DbStrategy) = {
    Stream.eval(Task.delay(UsersDb(transactor)(dbStrategy)))
  }

  val stream = for {
    config <- Stream.eval(Task.delay(ConfigFactory.load()))
    client <- httpClient()
    geoPluginClient <- geoPluginService(config, client)
    postgresTransactor <- transactor(config)
    strategy = dbStrategy(config)
    trackingDb <- trackingDb(postgresTransactor, strategy)
    trackingService <- Stream.emit(TrackingService(trackingDb))
    blogPostsDb <- blogPostsDb(postgresTransactor, strategy)
    blogPostsService <- Stream.emit(BlogPostsService(blogPostsDb))
    usersDb <- usersDb(postgresTransactor, strategy)
    authService <- Stream.emit(AuthService(usersDb))
  } yield {
    (config, client, geoPluginClient, trackingService, blogPostsService, authService)
  }

  val (configStream, httpClientStream, geoPluginServiceStream, trackingServiceStream, blogPostsServiceStream, authServiceStream) = stream.unzip6
}
