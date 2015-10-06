define ['RouteProvider', 'Constants'], () ->
	app = angular.module 'common', ['RouteProvider', 'constants']
	app.run [() ->
		return
	]
	return app
