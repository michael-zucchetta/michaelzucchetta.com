package controllers

import play.api.mvc.{Action, Controller}
import play.api.mvc.Results.Status

class NotFoundRouter extends Controller {

  def notFoundPage() = Action {
    new Status(404)
  }

}
