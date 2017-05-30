package config

import scala.concurrent.duration.FiniteDuration
import doobie.hikari.hikaritransactor.HikariTransactor
import fs2.Task


case class DbCredentials(url: String,
                         port: Int,
                         user: String,
                         password: String,
                         maxPoolSize: Int,
                         connectionTimeout: FiniteDuration)

class PosgresDao(dbCredentials: DbCredentials) {
  val hikariTransactorTask: Task[HikariTransactor[Task]] =
    for {
      xa <- HikariTransactor[Task](
        driverClassName = "org.postgresql.Driver",
        url = s"${dbCredentials.url}:${dbCredentials.port}",
        user = dbCredentials.user,
        pass = dbCredentials.password
      )
      _ <- xa.configure(ds =>
        Task.delay {
          ds.setMaximumPoolSize(dbCredentials.maxPoolSize)
          ds.setConnectionTimeout(dbCredentials.connectionTimeout.toMillis)
        })
    } yield xa

  def getHikariTransactor(): Task[HikariTransactor[Task]] = hikariTransactorTask

  def releaseConnection(): Task[Unit] = {
    for {
      hikaryTransactor <- hikariTransactorTask
      unit <- hikaryTransactor.shutdown
    } yield unit
  }
}