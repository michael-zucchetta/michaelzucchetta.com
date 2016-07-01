package controllers

import play.api.mvc._
import core.db.MongoFactory; 

object Application extends Controller {

  val mongoFactory = MongoFactory;

  def index = Action {
    Ok(views.html.main())
  }

  def firstEndpoint = Action {
    Ok("working 2.1" + mongoFactory.getString())
  }
  
  def secondEndpoint = Action {
    val connection = mongoFactory.getConnection()
    Ok("working 3")
  }

}
