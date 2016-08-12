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
    val dbs = connection.getDatabaseNames()
    var buildDbNames = ""
    buildDbNames = dbs.reduceLeft(_ + _ + "\n")
    Ok("working 3 \n" + buildDbNames)
  }

  def thirdEndpoint = Action {
    val collection = mongoFactory.getCollection("test")
    Ok("working 4")
  }

}
