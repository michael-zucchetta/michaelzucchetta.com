package models

import java.util.UUID

case class User(userUuid: UUID, username: String, email: String, scope: String)
