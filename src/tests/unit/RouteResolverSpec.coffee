serviceName = 'RouteResolverService'
define [serviceName], () ->
	describe 'RouteResolverService test', () ->
		$injector = angular.injector [ 'RouteResolverServices' ]
		routeResolver = $injector.get serviceName
		console.log "Route Provider " +  routeResolver.route.resolve('AboutMe')
		it 'Is it resolving controllers correctly', () ->
			resolved = routeResolver.route.resolve('AboutMe')
			expect(resolved.controller).toBe("AboutMeCtrl")
			expect(resolved.templateUrl.indexOf("/views/about-me.html")).toBe(0)
			return
		return
	return
