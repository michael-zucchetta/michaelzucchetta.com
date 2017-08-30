package dao

import config.DbStrategy
import doobie.imports._
import doobie.postgres.pgtypes._
import fs2.Task
import models.{PostStatus, PostType, MenuEntry}
import org.log4s.getLogger

case class MenuDb(transactor: Transactor[Task])(implicit dbStrategy: DbStrategy) {
  private[this] val logger = getLogger
  implicit val strategy = dbStrategy.strategy

  object sql {

    def getMenu(): Query0[MenuEntry] =
      sql"""
          select m.menu_uuid, m.title, m.component_name, m.order_in_menu, m.active, m.url, m.parent_uuid, m.page_post,
                bp.post_uuid, bp.post_title, bp.post_text, bp.post_date, bp.post_status
          from menu m left join blog_posts bp on m.page_post = bp.post_uuid
          where bp.post_status::varchar = ${PostStatus.PUBLISHED.toString} and bp.post_type::varchar = ${PostType.PAGE.toString}
                or m.page_post is null
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
