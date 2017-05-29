import config._
import fs2.{Stream, Task}
import org.http4s.server.blaze._
import org.http4s.util.StreamApp
        
object App extends StreamApp {
  
  def httpServer(port: Int) = {
    val routes = new Routes()
    BlazeBuilder
      .bindHttp(port, "0.0.0.0")
      .serve
  }

  override def main(args: List[String]): Stream[Task, Unit] = {
    for {
      _ <- httpServer(9000)
    } yield ()
  }
}
