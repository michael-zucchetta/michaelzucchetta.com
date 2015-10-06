define ['premain'], (app) ->

	factory =
		_sessionData: {}

	factory.getAttr = (name) ->
		return _sessionData[name]

	factory.setAttr = (name, obj) ->
		_sessionData[name] = obj
		return

	return factory
