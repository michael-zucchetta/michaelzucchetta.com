package config

import doobie.hikari.hikaritransactor.HikariTransactor
import fs2.Task
import scala.concurrent.duration.FiniteDuration


case class DbCredentials(url: String,
                         port: Int,
                         user: String,
                         password: String,
                         maxPoolSize: Int,
                         connectionTimeout: FiniteDuration)

class PosgresDao(dbCredentials: DbCredentials) {
  def xaTransactor(): Task[HikariTransactor[Task]] = {
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
  }
}