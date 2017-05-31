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

  
  /*
  val hikariTransactorStream = configStream.flatMap(config => {
    val doobieConnectionManager = Task.delay(DoobieConnectionManager(config))
    Stream.bracket(doobieConnectionManager)((d: DoobieConnectionManager) => Stream.eval(d.getHikariTransactor()), (d: DoobieConnectionManager) => d.releaseConnection())
  })*/


  val stream = for {
    config <- Stream.eval(Task.delay(ConfigFactory.load()))
    client <- httpClient()
    geoPluginClient <- geoPluginService(config, client)
  } yield (config, client, geoPluginClient)
  val configStream = stream.map { case (config, _, _) => config }
  val httpClientStream = stream.map { case (_, httpClient, _) => httpClient }
  val geoPluginServiceStream = stream.map { case (_, _, geoPluginService) => geoPluginService }
}
