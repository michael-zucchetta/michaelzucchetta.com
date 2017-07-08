package models

import java.util.UUID

case class MenuEntry(
                      menuUuid: UUID,
                      title: String,
                      componentName: String,
                      order: Int,
                      active: Boolean,
                      url: String,
                      parentIuid: Option[UUID],
                      pagePost: Option[UUID]
                    )

case class Menu(
               menuUuid: UUID,
               title: String,
               componentName: String,
               order: Int,
               active: Boolean,
               url: String,
               children: Option[Vector[Menu]],
               parent_uuid: Option[UUID],
               page_post: Option[UUID]
               )