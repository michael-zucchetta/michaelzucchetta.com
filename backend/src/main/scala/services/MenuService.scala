package services

import cats.implicits._
import dao.MenuDb
import models.{Menu, ComponentMenu}

case class MenuService(menuDb: MenuDb) {
  def getMenu() = {
    for {
      menuEntries <- menuDb.menu()
    } yield {
      val (childrenEntries, singleEntries) = menuEntries.groupBy(_.parentUuid).partition { case (parentUuidOpt, _) =>
          parentUuidOpt.isDefined
      }
      val filterUuids = childrenEntries.flatMap(_._1)
      val singleEntriesNoChildren = singleEntries.flatMap { case (_, entries) =>
          entries.filterNot(s => filterUuids.toVector.contains(s.menuUuid))
      }
      val entriesWithChildren = childrenEntries.flatMap{ case (parentUuidOpt, children) =>
        val parentOpt = parentUuidOpt.flatMap(parentUuid => menuEntries.find(_.parentUuid == parentUuid))
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

      val entriewsWithNoChildren = singleEntriesNoChildren.map { menuEntry =>
        Menu(
          menuEntry.menuUuid,
          menuEntry.title,
          ComponentMenu(menuEntry.url, menuEntry.componentName),
          menuEntry.order,
          menuEntry.active,
          None,
          None,
          // to be changed
          None
        )
      }
      entriesWithChildren ++ entriewsWithNoChildren
    }
  }
}
