import scala.util.control.NonFatal

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

    def getOption[T](path: String, f: String => T): Option[T] = {
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
  }
}
