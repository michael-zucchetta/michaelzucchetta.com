import scala.util.control.NonFatal
import fs2.{Stream, Task}
import com.typesafe.config.{Config => ConfigFile}

package object config {

  implicit class ConfigWithOption(config: ConfigFile) {

    def getOptionString(path: String) = {
      getOption[String](path, config.getString)
    }

    def getOptionInt(path: String) = {
      getOption[Int](path, config.getInt)
    }

    def getOptionLong(path: String) = {
      getOption[Long](path, config.getLong)
    }

    def getOption[T](path: String, f: String => T): Option[T] =
      try {
        if (config.hasPathOrNull(path)) {
          Some(f(path))
        } else {
          Option.empty[T]
        }
      } catch {
        case NonFatal(e) =>
          throw new IllegalStateException(s"The file does not exist on the provided config file in path $path: ${e.getMessage}")
      }
  }

  implicit class StreamUnzip[A,B,C,D,E,F,G](stream: Stream[Task, (A,B,C,D,E,F,G)]) {
    def unzip7() = {
      val firstStream = stream.map { case (firstObject, _, _, _, _, _, _) => firstObject }
      val secondStream = stream.map { case (_, secondObject, _, _, _, _, _) => secondObject }
      val thirdStream = stream.map { case (_, _, thirdObject, _, _, _, _) => thirdObject }
      val fourthStream = stream.map { case (_, _, _, fourthObject, _, _, _) => fourthObject }
      val fifthStream = stream.map { case (_, _, _, _, fifthObject, _, _) => fifthObject }
      val sixthStream = stream.map { case (_, _, _, _, _, sixthObject, _) => sixthObject }
      val seventhStream = stream.map { case (_, _, _, _, _, _, seventhObject) => seventhObject }

      (firstStream, secondStream, thirdStream, fourthStream, fifthStream, sixthStream, seventhStream)
    }
  }
}
