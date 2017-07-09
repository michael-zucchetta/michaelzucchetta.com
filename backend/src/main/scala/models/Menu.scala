package models

import java.util.UUID

import models.BlogPost

case class MenuEntry(
                      menuUuid: UUID,
                      title: String,
                      componentName: String,
                      order: Short,
                      active: Boolean,
                      url: String,
                      parentUuid: Option[UUID],
                      pagePost: Option[UUID]
                    )

case class ComponentMenu(url: String, component: String)

case class Menu(
               menuUuid: UUID,
               title: String,
               definition: ComponentMenu,
               order: Int,
               active: Boolean,
               children: Option[Vector[Menu]],
               parent_uuid: Option[UUID],
               pagePost: BlogPost
               )