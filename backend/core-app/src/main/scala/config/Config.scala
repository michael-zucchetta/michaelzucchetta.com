package config

import com.typesafe.config.{ConfigFactory, Config => ConfigFile}
import dao.TrackingDb
import doobie.util.transactor.Transactor
import fs2.{Strategy, Stream, Task}
import org.http4s.client.Client
import org.http4s.client.blaze.PooledHttp1Client
import services.{GeoPluginService, TrackingService}


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

  val stream = for {
    config <- Stream.eval(Task.delay(ConfigFactory.load()))
    client <- httpClient()
    geoPluginClient = geoPluginService(config, client)
    postgresTransactor <- transactor(config)
    trackingDb <- trackingDb(postgresTransactor, dbStrategy(config))
    trackingService <- Stream.emit(TrackingService(trackingDb))
  } yield {
    (config, client, geoPluginClient, trackingService)
  }
  val configStream = stream.map { case (config, _, _, _) => config }
  val httpClientStream = stream.map { case (_, httpClient, _, _) => httpClient }
  val geoPluginServiceStream = stream.flatMap { case (_, _, geoPluginService, _) => geoPluginService }
  val trackingServiceStream = stream.map { case (_, _, _, trackingService) => trackingService }
}
