package config

import com.typesafe.config.{ConfigFactory, Config => ConfigFile}
import fs2.{Stream, Task}
import org.http4s.client.Client
import org.http4s.client.blaze.{BlazeClient, PooledHttp1Client}
import services.GeoPluginService

object Config {
  private def httpClient() = {
    val client = Task.delay(PooledHttp1Client())
    Stream.bracket(client)((c: Client) => Stream.eval(Task.delay(c)), (c: Client) => c.shutdown)
  }

  private def geoPluginService(config: ConfigFile, httpClient: Client) = {
    val geoPluginUrl = config.getString("geoplugin.url")
    Stream.eval(Task.delay(GeoPluginService(geoPluginUrl, httpClient)))
  }

  private def transactor(config: ConfigFile) = {
    val doobieConnectionManager = Task.delay(PostgresDao(config))
    Stream.bracket(doobieConnectionManager)((d: PostgresDao) => Stream.eval(d.getHikariTransactor()), (d: PostgresDao) => d.releaseConnection())
  }

  val stream = for {
    config <- Stream.eval(Task.delay(ConfigFactory.load()))
    client <- httpClient()
    geoPluginClient = geoPluginService(config, client)
    potgresTransactor = transactor(config)
  } yield (config, client, geoPluginClient, potgresTransactor)
  val configStream = stream.map { case (config, _, _, _) => config }
  val httpClientStream = stream.map { case (_, httpClient, _, _) => httpClient }
  val geoPluginServiceStream = stream.flatMap { case (_, _, geoPluginService, _) => geoPluginService }
  val potgresTransactorStream = stream.flatMap { case (_, _, _, transactor) => transactor }
}
