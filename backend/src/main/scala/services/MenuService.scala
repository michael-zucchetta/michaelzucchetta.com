package services

import dao.MenuDb

class MenuService(menuDb: MenuDb) {
  def getMenu() = {
    for {
      menuEntries <- menuDb.menu()
    } yield {
      menuEntries
    }
  }
}
