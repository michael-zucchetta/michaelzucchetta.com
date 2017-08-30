package models

import java.time.Instant
import java.util.UUID

import models.Post

case class MenuEntry(
                      menuUuid: UUID,
                      title: String,
                      componentName: String,
                      order: Short,
                      active: Boolean,
                      url: String,
                      parentUuid: Option[UUID],
                      pagePost: Option[UUID],
                      pageUuid: Option[UUID],
                      pageTitle:  Option[String],
                      pageText: Option[String],
                      postDate: Option[Instant],
                      postStatus: Option[String]
                    )

case class ComponentMenu(url: String, component: String)

case class Menu(
               menuUuid: UUID,
               title: String,
               definition: ComponentMenu,
               order: Short,
               active: Boolean,
               children: Option[Vector[Menu]],
               parentUuid: Option[UUID],
               pagePost: Option[Post]
               )