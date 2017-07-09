package dao

import config.WebConfig
import doobie.scalatest.QueryChecker
import doobie.util.iolite.IOLite
import doobie.util.transactor.DriverManagerTransactor
import doobie.scalatest.QueryChecker
import org.scalatest.{Matchers, WordSpec}

class MenuDbSpec extends WordSpec with Matchers with QueryChecker {
  val transactor = DriverManagerTransactor[IOLite](
    "org.postgresql.Driver", "jdbc:postgresql:michaelzucchetta", "michaelzucchetta", ""
  )

  val menuDb: MenuDb = WebConfig.menuServiceStream.runLog.unsafeRun()(0).menuDb

  "MenuDb " should {
    "compile the menu list code query" in {
      check(menuDb.sql.getMenu())
    }
  }

}
