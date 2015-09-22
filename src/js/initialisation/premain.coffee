define ['RouteProvider'], () ->
	app = angular.module 'common', ['ngRoute', 'RouteProvider']
	app.run [() ->
		return
	]
	return app
