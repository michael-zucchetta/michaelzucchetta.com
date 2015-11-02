define ['RouteResolverService', 'Constants'], (appRouteResolverServices) ->

	app = angular.module 'RouteProvider', ['RouteResolverServices', 'ngRoute', 'constants']

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

			routeDecorator = ($delegate) ->
				$route = $delegate
				$route.route =  RouteResolverServiceProvider.route
				#default view
				$routeProvider.when('/home.html', {
					templateUrl: 'home.html'
				})
				# I allow routes to be defined after the application has been
				# bootstrapped. These go into a shared "routes" collection.
				
				$route.when = (path, route) ->
					$routeProvider.when(path, route)
					return this
				$route.otherwise = (path) ->
					$routeProvider.otherwise(path)
					return this
				return $route




			$provide.decorator( "$route", routeDecorator )
			
			return
	]

	return app
