package config

import javax.naming.ConfigurationException

import com.typesafe.config.{Config => ConfigFile}
import doobie.hikari.hikaritransactor.HikariTransactor
import fs2.Task
import scala.concurrent.duration.FiniteDuration
import scala.concurrent.duration.DurationInt


case class DbCredentials(url: String,
                         user: String,
                         password: String,
                         maxPoolSize: Int,
                         connectionTimeout: FiniteDuration)

case class PostgresDao(config: ConfigFile) {

  val dbCredentialsOptTask = Task.delay(credentialsTask())

  lazy val hikariTransactorTask: Task[HikariTransactor[Task]] =
    for {
      dbCredentialsOpt <- dbCredentialsOptTask
      dbCredentials = dbCredentialsOpt.getOrElse(throw new ConfigurationException())
      xa <- HikariTransactor[Task](
        driverClassName = "org.postgresql.Driver",
        url = dbCredentials.url,
        user = dbCredentials.user,
        pass = dbCredentials.password
      )
      _ <- xa.configure(ds =>
        Task.delay {
          ds.setMaximumPoolSize(dbCredentials.maxPoolSize)
          ds.setConnectionTimeout(dbCredentials.connectionTimeout.toMillis)
        })
    } yield xa

  private def credentialsTask() = for {
    url <- config.getOptionString("postgres.url")
    _ = println(s"URL is $url")
    maxPoolSize <- config.getOptionInt("postgres.maxPoolSize")
    connectionTimeout <- config.getOptionInt("postgres.connectionTimeout")
    user <- config.getOptionString("postgres.user")
    password <- config.getOptionString("postgres.password")
  } yield DbCredentials(url, user, password, maxPoolSize, connectionTimeout millis)

  def getHikariTransactor(): Task[HikariTransactor[Task]] = hikariTransactorTask

  def releaseConnection(): Task[Unit] = {
    for {
      hikaryTransactor <- hikariTransactorTask
      unit <- hikaryTransactor.shutdown
    } yield unit
  }
}