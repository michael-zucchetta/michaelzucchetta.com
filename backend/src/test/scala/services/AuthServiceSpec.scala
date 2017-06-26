package services

import dao.UsersDb
import org.scalatest.{MustMatchers, WordSpec}
import org.scalatest.concurrent.ScalaFutures
import org.scalatest.mockito.MockitoSugar

class AuthServiceSpec extends WordSpec with MustMatchers with MockitoSugar with ScalaFutures {
  val usersDbMock: UsersDb = mock[UsersDb]
  val authService = AuthService(usersDbMock)

  
}
