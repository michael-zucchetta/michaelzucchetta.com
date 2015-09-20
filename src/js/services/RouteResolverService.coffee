define ['angularRoute'], () ->
	routeResolver = () -> 
		@$get = () -> 
			return this

		@routeConfig = do () ->
			viewsDirectory = "/views/"
			controllersDirectory = "/js/ctrl/"

			setBaseDirectories = (viewsDir, controllersDir) ->
				viewsDirectory = viewsDir
				controllersDirectory = controllersDir
				return

			getViewsDirectory = () ->
				return viewsDirectory
			
			getControllersDirectory = () ->
				return controllersDirectory
			
			setBaseDirectories: setBaseDirectories,
			getControllersDirectory: getControllersDirectory,
			getViewsDirectory: getViewsDirectory


		@route = do (routeConfig = @routeConfig) ->
			resolve = (baseName, path, secure) ->
				if !path
					path = ''
				nonCamelToeBaseName = baseName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
				routeDef = {
					controller: baseName + 'Ctrl',
					secure: secure || false,
					templateUrl: routeConfig.getViewsDirectory() + path + nonCamelToeBaseName + '.html';
				}
				
				routeDef.resolve = {
					load: ['$q', '$rootScope', ($q, $rootScope) ->
						dependencies = [routeConfig.getControllersDirectory() + path + baseName + "Ctrl.js"]
						return resolveDependencies($q, $rootScope, dependencies)
					]
				}
				return routeDef
			resolveDependencies = ($q, $rootScope, dependencies) ->
				deferred = $q.defer
				require dependencies, () ->
					deferred.resolve()
					$rootScope.apply()
					return
				return deferred.promise
			resolve: resolve
		return
	servicesApp = angular.module 'RouteResolverServices', []

	#Must be a provider since it will be injected into module.config()
	servicesApp.provider 'RouteResolverService', routeResolver
	return
