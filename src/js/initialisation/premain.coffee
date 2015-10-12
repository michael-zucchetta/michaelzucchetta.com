define ['RouteProvider', 'Constants', 'ngFileUpload'], () ->
	app = angular.module 'common', ['RouteProvider', 'constants', 'ngFileUpload']
	app.run [() ->
		return
	]
	return app
