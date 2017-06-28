import cats.kernel.Semigroup
import doobie.imports._


package object dao {
  implicit def connectionIOMonoid = new Semigroup[ConnectionIO[Int]] {

    override def combine(x: ConnectionIO[Int], y: ConnectionIO[Int]): ConnectionIO[Int] = {
      for {
        res1 <- x
        res2 <- y
      } yield res1 + res2
    }
  }
}
