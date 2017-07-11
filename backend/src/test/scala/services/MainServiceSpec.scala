package services

import java.util.UUID

import dao.MenuDb
import fs2.{Strategy, Task}
import models.{ComponentMenu, Menu, MenuEntry}
import org.mockito.Mockito._
import org.mockito.Matchers._
import org.scalatest.{MustMatchers, WordSpec}
import org.scalatest.concurrent.ScalaFutures
import org.scalatest.mockito.MockitoSugar

import scala.util.Random

class MainServiceSpec extends WordSpec with MustMatchers with MockitoSugar with ScalaFutures {
  val menuDbMock = mock[MenuDb]
  val menuService = MenuService(menuDbMock)
  
  val parentMenuEntry =  MenuEntry(
    UUID.randomUUID(),
    UUID.randomUUID().toString,
    UUID.randomUUID().toString,
    Random.nextInt().toShort,
    true,
    UUID.randomUUID().toString,
    None,
    None
  )
  
  val menuEntryChild1 = MenuEntry(
    UUID.randomUUID(),
    UUID.randomUUID().toString,
    UUID.randomUUID().toString,
    Random.nextInt().toShort,
    true,
    UUID.randomUUID().toString,
    Some(parentMenuEntry.menuUuid),
    None
  )

  val menuEntryChild2 = MenuEntry(
    UUID.randomUUID(),
    UUID.randomUUID().toString,
    UUID.randomUUID().toString,
    Random.nextInt().toShort,
    true,
    UUID.randomUUID().toString,
    Some(parentMenuEntry.menuUuid),
    None
  )

  val menuEntryChild3 = MenuEntry(
    UUID.randomUUID(),
    UUID.randomUUID().toString,
    UUID.randomUUID().toString,
    Random.nextInt().toShort,
    true,
    UUID.randomUUID().toString,
    Some(parentMenuEntry.menuUuid),
    None
  )

  val menuChild1 = Menu(
    menuEntryChild1.menuUuid,
    menuEntryChild1.title,
    ComponentMenu(
      menuEntryChild1.url,
      menuEntryChild1.componentName
    ),
    menuEntryChild1.order,
    menuEntryChild1.active,
    None,
    menuEntryChild1.parentUuid,
    None
  )

  val menuChild2 = Menu(
    menuEntryChild2.menuUuid,
    menuEntryChild2.title,
    ComponentMenu(
      menuEntryChild2.url,
      menuEntryChild2.componentName
    ),
    menuEntryChild2.order,
    menuEntryChild2.active,
    None,
    menuEntryChild2.parentUuid,
    None
  )

  val menuChild3 = Menu(
    menuEntryChild3.menuUuid,
    menuEntryChild3.title,
    ComponentMenu(
      menuEntryChild3.url,
      menuEntryChild3.componentName
    ),
    menuEntryChild3.order,
    menuEntryChild3.active,
    None,
    menuEntryChild3.parentUuid,
    None
  )

  val parentMenu = Menu(
    parentMenuEntry.menuUuid,
    parentMenuEntry.title,
    ComponentMenu(
      parentMenuEntry.url,
      parentMenuEntry.componentName
    ),
    parentMenuEntry.order,
    parentMenuEntry.active,
    Some(Vector(menuChild1, menuChild2, menuChild3)),
    None,
    None
  )

  val menuEntryNoChild1 = MenuEntry(
    UUID.randomUUID(),
    UUID.randomUUID().toString,
    UUID.randomUUID().toString,
    Random.nextInt().toShort,
    true,
    UUID.randomUUID().toString,
    None,
    None
  )

  val menuNoChild1 = Menu(
    menuEntryNoChild1.menuUuid,
    menuEntryNoChild1.title,
    ComponentMenu(
      menuEntryNoChild1.url,
      menuEntryNoChild1.componentName
    ),
    menuEntryNoChild1.order,
    menuEntryNoChild1.active,
    None,
    None,
    None
  )

  val menuEntryNoChild2 = MenuEntry(
    UUID.randomUUID(),
    UUID.randomUUID().toString,
    UUID.randomUUID().toString,
    Random.nextInt().toShort,
    true,
    UUID.randomUUID().toString,
    None,
    None
  )

  val menuNoChild2 = Menu(
    menuEntryNoChild2.menuUuid,
    menuEntryNoChild2.title,
    ComponentMenu(
      menuEntryNoChild2.url,
      menuEntryNoChild2.componentName
    ),
    menuEntryNoChild2.order,
    menuEntryNoChild2.active,
    None,
    None,
    None
  )

  implicit val strategy = Strategy.fromFixedDaemonPool(2)
  val menuEntries = Vector(parentMenuEntry, menuEntryChild1, menuEntryChild2, menuEntryChild3, menuEntryNoChild1, menuEntryNoChild2)

  "MenuService" should {
    "retrieve a list of menu's entires" in {
      when(menuDbMock.menu()).thenReturn(Task.now(menuEntries))
      whenReady(menuService.getMenu().unsafeRunAsyncFuture()) { response =>
        response must be(Vector(menuNoChild1, menuNoChild2, parentMenu).sortBy(_.order))
      }
    }
  }
}
