define ['RouteResolverService', 'Constants'], (appRouteResolverServices) ->

	app = angular.module 'RouteProvider', ['RouteResolverServices', 'ngRoute', 'constants']

	app.config ['$routeProvider', 'RouteResolverServiceProvider', '$controllerProvider',
		'$compileProvider', '$filterProvider', '$provide', 'MENU_JSON', 'FUNCTIONS_PREFIX', ($routeProvider,
		RouteResolverServiceProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, MENU_JSON, FUNCTIONS_PREFIX) ->
		
			initInjector = angular.injector(['ng'])
			$http = initInjector.get('$http')
			#Change default views and controllers directory using the following:
			#routeResolverProvider.routeConfig.setBaseDirectories('/app/views', '/app/controllers');

			app.register = {
				controller: $controllerProvider.register,
				directive: $compileProvider.directive,
				filter: $filterProvider.register,
				factory: $provide.factory,
				service: $provide.service
			}

			$http.get(MENU_JSON).then (response) ->
				#Define routes - controllers will be loaded dynamically
				route = RouteResolverServiceProvider.route
				#$routeProvider
				#	.when('/functionalities/7', route.resolve('AboutMe') )
				#	.when('/functionalities/:id', route.resolve('Base64'))
				menu = response.data
				_.each menu, (menuItem) ->
					$routeProvider.when('/' + FUNCTIONS_PREFIX + '/' + menuItem.id, route.resolve(menuItem.name)) if menuItem.active is true
					return
				return
			
			return
	]

	return app
