package controllers

import com.mongodb.casbah.Imports._
import com.mongodb.casbah.MongoCollection
import core.db.MongoFactory
import play.api.libs.json.{JsError, JsSuccess, Json}
import play.api.mvc.Action
import reactivemongo.bson.BSONObjectID
import reactivemongo.play.json.BSONFormats._
import com.github.nscala_time.time.Imports.DateTime

trait TrackerActionTrait {
  val _id: Option[BSONObjectID]
  val actionName: String
  var referrer: Option[String]
}
case class TrackerActionBase(_id: Option[BSONObjectID], actionName: String, pageId: String)
case class TrackerAction(_id: Option[BSONObjectID], actionName: String, referrer: Option[String], eventTime: Option[DateTime], pageId: String)

class TrackerController extends MetaController {

  implicit val trackerActionFormat = Json.format[TrackerAction]

  private val referrerLabel = "referrer"
 
  private val trackerCollection = "tracker"

  def trackFirstAccess() = Action { request =>
    val jsonOpt = request.body.asJson
    val referrerOpt = request.headers.get(referrerLabel)
    jsonOpt.map(json =>
      json.validate[TrackerAction] match {
        case s: JsSuccess[TrackerAction] => {
          logger.info(s"tracking action ${json}")
          val trackerList: MongoCollection = MongoFactory.getCollection(trackerCollection)
          s.map(trackingAction => {
            val builtTrackingAction = trackingAction._id match {
              case Some(id) => trackingAction
              case None => 
                TrackerAction(_id = Some(BSONObjectID.generate),
                                actionName = trackingAction.actionName,
                                referrer = referrerOpt,
                                eventTime = Some(DateTime.now),
                                pageId = trackingAction.pageId)
            }
            trackerList.insert(MongoDBObject(Json.toJson(builtTrackingAction).toString))
            Ok("OK")
          })
        }
      case e: JsError =>
        BadRequest("the json is not valid")
    })
    Ok("hola")
  }
}
