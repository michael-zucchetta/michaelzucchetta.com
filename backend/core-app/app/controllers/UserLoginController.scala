package controllers

import org.mindrot.jbcrypt.BCrypt
import play.api.libs.json.Json
import play.api.libs.json.JsSuccess
import play.api.libs.json.JsError

import play.api.mvc.{Action, Controller}
import org.bson.types.ObjectId

import com.mongodb.casbah.Imports.MongoDBObject

import core.db.MongoFactory

case class Login(var _id: Option[String], name: String, surname: String, email: String, var password: String, var confirmed: Boolean, var activated: Boolean)

class UserLoginController extends Controller {

  implicit val loginFormat = Json.format[Login]

  val loginCollection = "login"

  def getHash(str: String) : String = {
    BCrypt.hashpw(str, BCrypt.gensalt())
  }
  
  def checkHash(str: String, strHashed: String): Boolean = {
    BCrypt.checkpw(str,strHashed)
  }

  def createUser() = Action { implicit request =>
    val login = MongoFactory.getCollection(loginCollection)
    val jsonInput = request.body.asJson
    if (!jsonInput.isDefined || jsonInput == None) {
      println("SSS2", jsonInput == None, jsonInput.isDefined)
      BadRequest("data not valid")
    }
    else {
      jsonInput.get.validate[Login] match {
        case s: JsSuccess[Login] => {
          val user = s.get
          user.confirmed = false
          user.activated = false
          user._id = Option(new ObjectId().toString)
          user.password = getHash(user.password)
          login.insert(MongoDBObject(Json.toJson(user).toString))
          Ok("daje")
        }
        case e: JsError => {
          BadRequest("KO")
        }
      }
    }
  }
}
