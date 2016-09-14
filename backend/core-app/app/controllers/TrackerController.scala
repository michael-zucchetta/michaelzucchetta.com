package controllers

import play.api.mvc.{Action, Controller}

class TrackerController extends Controller {
  
  private val referrerLabel = "referrer"
  
  def trackFirstAccess() = Action { request =>
    val referrer = request.headers.get(referrerLabel)
    println("referrer" + referrer)
    println(request.body)
    Ok("hola")
  }
}
