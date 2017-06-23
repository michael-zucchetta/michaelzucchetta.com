package dao

import java.time.Instant
import java.util.UUID

import config.WebConfig
import doobie.scalatest.QueryChecker
import doobie.util.iolite.IOLite
import doobie.util.transactor.DriverManagerTransactor
import models.{BlogPost, BlogPostComment, UserAuthCode}
import org.scalatest.{Matchers, WordSpec}

class UsersDbSpec extends WordSpec with Matchers with QueryChecker {
  val transactor = DriverManagerTransactor[IOLite](
    "org.postgresql.Driver", "jdbc:postgresql:michaelzucchetta", "michaelzucchetta", ""
  )

  val usersDb = WebConfig.authServiceStream.runLog.unsafeRun()(0).usersDb

  val userAuthCode = UserAuthCode(UUID.randomUUID(), Instant.now(), UUID.randomUUID().toString, UUID.randomUUID().toString, UUID.randomUUID().toString)

  "UsersDb " should {
    "compile delete auth code query" in {
      check(usersDb.sql.deleteAuthCode(userAuthCode.authCode))
    }
  }

  "UsersDb " should {
    "compile insert auth code query" in {
      check(usersDb.sql.insertAuthCode(userAuthCode))
    }
  }

  "UsersDb " should {
    "compile expire auth code query" in {
      check(usersDb.sql.expireAuthCode(userAuthCode))
    }
  }

  "UsersDb " should {
    "compile read auth code query" in {
      check(usersDb.sql.readAuthCode(userAuthCode))
    }
  }

  "UsersDb " should {
    "compile read users query" in {
      check(usersDb.sql.readUsers())
    }
  }

  "UsersDb " should {
    "compile authenticate user query" in {
      check(usersDb.sql.authenticateUser(UUID.randomUUID().toString, UUID.randomUUID().toString))
    }
  }

  "UsersDb" should {
    "compile getUserByAuthCode query" in {
      check(usersDb.sql.getUserByAuthCode(UUID.randomUUID().toString))
    }
  }
}
