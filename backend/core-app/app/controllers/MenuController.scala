package controllers

import play.api.libs.json.Json
import play.api.libs.json.JsSuccess
import play.api.libs.json.JsResult
import play.api.libs.json.JsString
import play.api.libs.json.Format
import play.api.libs.json.JsError
import play.api.libs.json.Reads
import play.api.libs.json.JsPath
import play.api.libs.json.JsValue
import play.api.libs.json.Reads._
import play.api.mvc.{Action, Controller}

import reactivemongo.bson.BSONObjectID
import play.modules.reactivemongo.json.BSONFormats.BSONObjectIDFormat

import com.mongodb.BasicDBObject

import core.db.MongoFactory
import com.mongodb.casbah.Imports.MongoDBObject
import com.mongodb.casbah.MongoCollection
import play.api.libs.functional.syntax._

case class MenuDefinition(url: String, component: String)
case class MenuElement(var _id: Option[BSONObjectID], name: String, title: String, order: Int, active: Boolean, enabled: Boolean, parentId: Option[Long], definition: Option[MenuDefinition])

class MenuController extends Controller {
  
  implicit val menuDefinitionFormat = Json.format[MenuDefinition]
  implicit val menuFormat = Json.format[MenuElement]

  val menuCollection = "menu"

  def retrieveMenu() = Action {
    val menu = MongoFactory.getCollection(menuCollection).toList
    val tmpMenu = for {
      menuElement <- menu
    } yield menuElement.toString
    val realMenu = tmpMenu.map(Json.parse(_).as[MenuElement])
      .filter(_.enabled)
      Ok(Json.toJson(realMenu))
  }

  def addMenuElement() = Action { implicit request =>
    val json = request.body.asJson;
    if (!json.isDefined) {
      BadRequest("nothing's working")
    } else {
      val menuElement = json.get
      menuElement.validate[MenuElement] match {
        case s: JsSuccess[MenuElement] => {
          val menuList: MongoCollection = MongoFactory.getCollection(menuCollection)
          var newMenuEl = s.get
          if (newMenuEl._id == None) {
            val lastMenuEl = menuList
              .find()
              .sort(MongoDBObject("_id" -> -1))
              .limit(1)
              .next
              .toString
              val lastId = Json.parse(lastMenuEl).as[MenuElement]._id
              newMenuEl._id = Some(BSONObjectID.generate)
          }
          menuList.insert(MongoDBObject(Json.toJson(newMenuEl).toString))
          Ok("OK")
        }
        case e: JsError => {
          BadRequest("the json is not valid")
        }
      }
    }
  }
}
