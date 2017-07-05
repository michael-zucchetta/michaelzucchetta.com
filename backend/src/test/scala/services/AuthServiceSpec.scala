package services

import dao.UsersDb
import fs2.Task
import org.scalatest.{MustMatchers, WordSpec}
import org.scalatest.concurrent.ScalaFutures
import org.scalatest.mockito.MockitoSugar
import models.User

import org.mockito.Mockito._
import java.util.UUID

class AuthServiceSpec extends WordSpec with MustMatchers with MockitoSugar with ScalaFutures {
  val usersDbMock: UsersDb = mock[UsersDb]
  val user = User(UUID.randomUUID(), UUID.randomUUID().toString, UUID.randomUUID().toString, UUID.randomUUID().toString, UUID.randomUUID().toString)

  when(usersDbMock.getUsers()).thenReturn(Task.now(Vector(user)))
  
  val authService = AuthService(usersDbMock)
}
