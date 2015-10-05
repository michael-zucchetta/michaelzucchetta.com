define ['RouteResolverService'], (appRouteResolverServices) ->

	app = angular.module 'RouteProvider', ['RouteResolverServices', 'ngRoute']

	app.config ['$routeProvider', 'RouteResolverServiceProvider', '$controllerProvider',
		'$compileProvider', '$filterProvider', '$provide', ($routeProvider,
		RouteResolverServiceProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) ->
		
			#Change default views and controllers directory using the following:
			#routeResolverProvider.routeConfig.setBaseDirectories('/app/views', '/app/controllers');

			app.register = {
				controller: $controllerProvider.register,
				directive: $compileProvider.directive,
				filter: $filterProvider.register,
				factory: $provide.factory,
				service: $provide.service
			}

			#Define routes - controllers will be loaded dynamically
			route = RouteResolverServiceProvider.route
			$routeProvider
				.when('/functionalities/7', route.resolve('AboutMe') )
				.when('/functionalities/:id', route.resolve('Base64'))
			return
	]

	app.factory ['$routeProvider', 'RouteResolverServiceProvider', 'FUNCTIONS_PREFIX', ($routeProvider, RouteResolverServiceProvider, FUNCTIONS_PREFIX) ->
		factory = {}
		factory.setFunctionalities = (menu) ->
			return
		return factory
	]
	return app
