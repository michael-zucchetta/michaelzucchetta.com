package services

import java.time.Instant
import java.util.UUID

import cats.implicits._
import dao.MenuDb
import models._

case class MenuService(menuDb: MenuDb) {
  def getMenu() = {
    for {
      menuEntries <- menuDb.menu()
    } yield {
      val (childrenEntries, singleEntries) = menuEntries.groupBy(_.parentUuid).partition { case (parentUuidOpt, _) =>
          parentUuidOpt.isDefined
      }
      val filterUuids = childrenEntries.flatMap { case (parentUuidOpt, children) => children.map(_.menuUuid) ++ parentUuidOpt }
      val singleEntriesNoChildren = singleEntries.flatMap { case (_, entries) =>
          entries.filterNot(s => filterUuids.toVector.contains(s.menuUuid))
      }
      val entriesWithChildren = childrenEntries.flatMap{ case (parentUuidOpt, children) =>
        val parentOpt = parentUuidOpt.flatMap(parentUuid => menuEntries.find(_.menuUuid === parentUuid))
        parentOpt.map(parent => parent -> children)
      }.map { case (parent, childEntries) => {
        val children = childEntries.map(menuEntry =>
          Menu(
            menuEntry.menuUuid,
            menuEntry.title,
            ComponentMenu(menuEntry.url, menuEntry.componentName),
            menuEntry.order,
            menuEntry.active,
            None,
            parent.menuUuid.some,
            // temporary
            None
          ))
        Menu(
          parent.menuUuid,
          parent.title,
          // to be changed
          ComponentMenu(parent.url, parent.componentName),
          parent.order,
          parent.active,
          children.some,
          None,
          None
        )
      }}

      val entriewsWithNoChildren = singleEntriesNoChildren.map { menuEntry => {
          Menu(
            menuEntry.menuUuid,
            menuEntry.title,
            ComponentMenu(menuEntry.url, menuEntry.componentName),
            menuEntry.order,
            menuEntry.active,
            None,
            None,
            // to be changed
            menuEntry.pagePost
          )
        }
      }
      (entriesWithChildren.toVector ++ entriewsWithNoChildren).sortBy(_.order)
    }
  }

  def blogBuilder() = {
    
  }
}
