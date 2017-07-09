package dao

import config.DbStrategy
import doobie.imports._
import doobie.postgres.pgtypes._
import fs2.Task
import models.MenuEntry
import org.log4s.getLogger

case class MenuDb(transactor: Transactor[Task])(implicit dbStrategy: DbStrategy) {
  private[this] val logger = getLogger
  implicit val strategy = dbStrategy.strategy

  object sql {

    def getMenu(): Query0[MenuEntry] =
      sql"""
          select menu_uuid, title, component_name, order_in_menu, active, url, parent_uuid, page_post
          from menu
      """.query[MenuEntry]
  }

  object io {
    def getMenu() = {
      for {
        menuTask <- Task.start(sql.getMenu().vector.transact(transactor))
        menuEntries <- menuTask
      } yield {
        logger.info(s"Retrieved menu $menuEntries")
        menuEntries
      }
    }
  }

  def menu() =
    io.getMenu()

}
