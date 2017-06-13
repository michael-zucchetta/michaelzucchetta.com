package dao


import config.DbStrategy
import doobie.imports._
import doobie.postgres.pgtypes._

import fs2.Task
import models.TrackingAction
import org.log4s.getLogger



case class TrackingDb(transactorTask: Task[Transactor[Task]])(implicit val dbStrategy: DbStrategy) {
  private[this] val logger = getLogger

  object sql {
    def writeTrackingAction(ta: TrackingAction): Update0 =
      sql"""
            insert into tracking_actions
              (tracking_uuid, action_date, action_type, site_referer, provenience, ip_address, country, city)
            values
              (${ta.trackingUuid}, ${ta.actionDate}, ${ta.actionType}, ${ta.siteReferer}, ${ta.provenience}, ${ta.ipAddress}, ${ta.country}, ${ta.city})
        """.update
  }

  object io {
    def writeTrackingAction(ta: TrackingAction) = {
      val connectionIo: ConnectionIO[Int] = sql.writeTrackingAction(ta).run
      for {
        transactor <- transactorTask
        transaction <- Task.start(connectionIo.transact(transactor))(dbStrategy.strategy)
        rowsInserted <- transaction
      } yield {
        logger.info(s"Rows inserted during tracking db are: $rowsInserted")
        rowsInserted
      }
    }
  }

}