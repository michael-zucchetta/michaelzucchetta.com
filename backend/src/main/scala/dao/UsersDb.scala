package dao

import config.DbStrategy
import doobie.imports._
import doobie.postgres.pgtypes._

import fs2.Task
import models.User

class UsersDb(transactorTask: Task[Transactor[Task]])(implicit val dbStrategy: DbStrategy) {

  object sql {
    def readUsers(): Query0[User] =
      sql"""
            select user_uuid, user, email, password_hash from users
        """.query[User]
  }

  object io {
    def getUsers() =
      for {
        transactor <- transactorTask
        usersTask <- Task.start(sql.readUsers().list.transact(transactor))(dbStrategy.strategy)
        users <- usersTask
      } yield users
  }

  def getUsers() =
    io.getUsers()
}
