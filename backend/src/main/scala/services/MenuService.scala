package services

import dao.MenuDb

case class MenuService(menuDb: MenuDb) {
  def getMenu() = {
    for {
      menuEntries <- menuDb.menu()
    } yield {
      menuEntries
    }
  }
}
