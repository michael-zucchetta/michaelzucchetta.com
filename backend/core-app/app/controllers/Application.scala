package controllers

import play.api.mvc._
import core.db.MongoFactory; 
import scala.concurrent.{ExecutionContext, Future}

class Application extends Controller {

  val mongoFactory = MongoFactory;
  implicit val ec = ExecutionContext.global
  
  def index = Action {
    Ok(views.html.main())
  }

  def firstEndpoint = Action {
    Ok("working 2.1" + mongoFactory.getString())
    println("random")
    Ok("500")
  }

  def secondEndpoint = Action {
    val futurePromise = scala.concurrent.Future {
      Thread.sleep(1000)
      println("async")
    }
    val connection = mongoFactory.getConnection()
    val dbs = connection.getDatabaseNames()
    var buildDbNames = ""
    buildDbNames = dbs.reduceLeft(_ + _ + "\n")
    Ok("working 3 \n" + buildDbNames)
  }

  def thirdEndpoint = Action.async {
    val futurePromise = scala.concurrent.Future {
      Thread.sleep(1000)
      mongoFactory.getCollection("test")
      println("fatta")
    }
    Future {
      Thread.sleep(500)
      Ok("working 4")
    }
  }

}
