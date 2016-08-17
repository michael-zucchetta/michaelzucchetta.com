package auth

import be.objectify.deadbolt.scala.{HandlerKey, DeadboltHandler}
import be.objectify.deadbolt.scala.cache.HandlerCache

import javax.inject.Singleton

@Singleton
class DeadboltCacheHandler extends HandlerCache {
	val defaultHandler: DeadboltHandler = new MyDeadboltHandler

	// HandlerKeys is an user-defined object, containing instances of a case class that extends HandlerKey  
	val handlers: Map[Any, DeadboltHandler] = Map(HandlerKeys.defaultHandler -> defaultHandler,
			HandlerKeys.altHandler -> new MyDeadboltHandler(Some(MyAlternativeDynamicResourceHandler)),
			HandlerKeys.userlessHandler -> new MyUserlessDeadboltHandler)
	// Get the default handler.
	override def apply(): DeadboltHandler = defaultHandler
	
	// Get a named handler
	override def apply(handlerKey: HandlerKey): DeadboltHandler = handlers(handlerKey)
}
