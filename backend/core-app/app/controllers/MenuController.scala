package controllers

import com.mongodb.casbah.Imports.MongoDBObject
import com.mongodb.casbah.MongoCollection
import core.db.MongoFactory
import play.api.libs.json.{JsError, JsSuccess, Json}
import play.api.mvc.{Action, Controller}
import reactivemongo.bson.BSONObjectID
import play.modules.reactivemongo.json._
import reactivemongo.play.json.BSONFormats._

case class MenuDefinition(url: String, component: String)
case class MenuElement(_id: Option[BSONObjectID], name: String, title: String, order: Int, active: Boolean, enabled: Boolean, parentId: Option[Long], definition: Option[MenuDefinition])

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
          s.map(menuEl => {
            val newMenuEl = menuEl._id match {
              case Some(id) =>
                menuEl
              case None =>
                MenuElement(
                  _id = Some(BSONObjectID.generate),
                  name = menuEl.name,
                  title = menuEl.title,
                  order = menuEl.order,
                  active = menuEl.active,
                  enabled = menuEl.enabled,
                  parentId = menuEl.parentId,
                  definition = menuEl.definition)
            }
            menuList.insert(MongoDBObject(Json.toJson(newMenuEl).toString))
          })
          Ok("OK")
        }
        case e: JsError => {
          BadRequest("the json is not valid")
        }
      }
    }
  }
}
