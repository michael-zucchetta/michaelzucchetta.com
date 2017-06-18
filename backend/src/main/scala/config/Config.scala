package config

import com.typesafe.config.{ConfigFactory, Config => ConfigFile}
import config.Config.dbStrategy
import dao.{BlogPostsDb, TrackingDb}
import doobie.util.transactor.Transactor
import fs2.{Strategy, Stream, Task}
import org.http4s.client.Client
import org.http4s.client.blaze.PooledHttp1Client
import services.{BlogPostsService, GeoPluginService, TrackingService}


case class DbStrategy(strategy: Strategy)

object Config {
  private def httpClient() = {
    val client = Task.delay(PooledHttp1Client())
    Stream.bracket(client)((c: Client) => Stream.emit(c), (c: Client) => c.shutdown)
  }

  private def geoPluginService(config: ConfigFile, httpClient: Client) = {
    val geoPluginUrl = config.getString("geoplugin.url")
    Stream.eval(Task.delay(GeoPluginService(geoPluginUrl, httpClient)))
  }

  private def transactor(config: ConfigFile) = {
    val doobieConnectionManager = Task.delay(PostgresDao(config))
    Stream.bracket(doobieConnectionManager)((d: PostgresDao) => Stream.emit(d.getHikariTransactor()), (d: PostgresDao) => d.releaseConnection())
  }

  private def dbStrategy(config: ConfigFile): DbStrategy = {
    val threadNumber = config.getOptionInt("db.strategy.threads").getOrElse(2)
    DbStrategy(Strategy.fromFixedDaemonPool(threadNumber))
  }

  private def trackingDb(transactorTask: Task[Transactor[Task]], dbStrategy: DbStrategy) = {
    Stream.eval(Task.delay(TrackingDb(transactorTask)(dbStrategy)))
  }

  private def blogPostsDb(transactor: Task[Transactor[Task]], dbStrategy: DbStrategy) = {
    Stream.eval(Task.delay(BlogPostsDb(transactor)(dbStrategy)))
  }

  val stream = for {
    config <- Stream.eval(Task.delay(ConfigFactory.load()))
    client <- httpClient()
    geoPluginClient = geoPluginService(config, client)
    postgresTransactor <- transactor(config)
    strategy = dbStrategy(config)
    trackingDb <- trackingDb(postgresTransactor, strategy)
    trackingService <- Stream.emit(TrackingService(trackingDb))
    blogPostsDb <- blogPostsDb(postgresTransactor, strategy)
    blogPostsService <- Stream.emit(BlogPostsService(blogPostsDb))
  } yield {
    (config, client, geoPluginClient, trackingService, blogPostsService)
  }
  val configStream = stream.map { case (config, _, _, _, _) => config }
  val httpClientStream = stream.map { case (_, httpClient, _, _, _) => httpClient }
  val geoPluginServiceStream = stream.flatMap { case (_, _, geoPluginService, _, _) => geoPluginService }
  val trackingServiceStream = stream.map { case (_, _, _, trackingService, _) => trackingService }
  val blogPostsServiceStream = stream.map { case (_, _, _, _, blogPostsService) => blogPostsService }
}
