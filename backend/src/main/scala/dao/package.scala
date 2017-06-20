import doobie.imports.ConnectionIO

package object dao {
  implicit class ConnectionIOInt(connectionBase: ConnectionIO[Int]) {
    def |+|(connectionAddend: ConnectionIO[Int]) = {
      for {
        res1 <- connectionBase
        res2 <- connectionAddend
      } yield res1 + res2
    }
  }
}
