import fs2.Task
import io.circe._
import io.circe.generic.extras.Configuration

import io.circe.syntax._
import org.http4s._
import org.http4s.circe._
import org.http4s.dsl._

import scalaoauth2.provider.ProtectedResourceRequest

package object routes {
  implicit val config: Configuration = Configuration.default.withDefaults

  def returnResult[T](resultEither: Either[Response, T])(implicit encoder: Encoder[T]): Task[Response] =
    resultEither match {
      case Right(correctResult) =>
        Ok(correctResult.asJson)
      case Left(status) =>
        Task.now(status)
    }

  def fromHttp4sToProtectedRequest(req: Request) = {
    val headers = req.headers.toVector.map(header => header.name.toString() -> Seq(header.value)).toMap
    new ProtectedResourceRequest(headers, req.multiParams)
  }
}
