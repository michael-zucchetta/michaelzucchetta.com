import fs2.Task
import io.circe._
import io.circe.generic.extras.Configuration

import io.circe.syntax._
import org.http4s.Response
import org.http4s.circe._
import org.http4s.dsl._

package object routes {
  implicit val config: Configuration = Configuration.default.withSnakeCaseKeys

  def returnResult[T](resultEither: Either[Response, T])(implicit encoder: Encoder[T]): Task[Response] =
    resultEither match {
      case Right(correctResult) =>
        Ok(correctResult.asJson)
      case Left(status) =>
        Task.now(status)
    }

}
