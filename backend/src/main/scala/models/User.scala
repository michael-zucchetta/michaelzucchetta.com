package models

import java.util.UUID
import java.time.Instant

import io.circe.{Decoder, Encoder}

case class User(userUuid: UUID, username: String, email: String, scope: String)

case class UserAuthCode(userUuid: UUID, timestampInserted: Instant, authCode: String, redirectUrl: String)