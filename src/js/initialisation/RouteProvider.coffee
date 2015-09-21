define ['RouteResolverService'], () ->

	app = angular.module 'RouteProvider', ['RouteResolverServices', 'ngRoute']

	app.config ['$routeProvider', 'RouteResolverService', '$controllerProvider',
		'$compileProvider', '$filterProvider', '$provide', ($routeProvider,
		RouteResolverService, $controllerProvider, $compileProvider, $filterProvider, $provide) ->
		
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
			route = RouteResolverService.route
			$routeProvider
				.when('/functionalities/7', route.resolve('AboutMe') )
				.when('/functionalities/:id', route.resolve('Base64'))
			return
	]
	return app
		
