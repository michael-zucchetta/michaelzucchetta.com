package controllers

import play.api.libs.json.Json
import play.api.libs.json.Reads
import play.api.libs.json._
import play.api.libs.json.Reads._
import play.api.mvc.{Action, Controller}

import com.mongodb.BasicDBObject

import core.db.MongoFactory
import play.api.libs.functional.syntax._

case class MenuDefinition(url: String, component: String)
case class MenuElement(_id: Long, name: Option[String], title: Option[String], order: Option[Int], active: Boolean, enabled: Boolean, parentId: Option[Long], definition: Option[MenuDefinition])

object MenuController extends Controller {
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

}
