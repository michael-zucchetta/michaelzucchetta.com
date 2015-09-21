routeResolverService = 'RouteResolverService'
routeProvider = 'RouteProvider'
define [routeResolverService, routeProvider, 'angularRoute', 'angularMocks'], () ->
	beforeEach () ->
		#module('RouteResolverServices')
		#module('RouteProvider')
		return
	
	location = route = rootScope = null
	beforeEach inject (_$location_, _$route_, _$rootScope_) ->
		location = _$location_
		route = _$route_
		rootScope = _$rootScope_
		return
	
	describe 'RouteResolverService resolving names to objects', () ->
		$injectorModule = angular.injector [ 'RouteResolverServices' ]
		routeResolver = $injectorModule.get routeResolverService
		console.log "Route Provider " +  routeResolver.route.resolve('AboutMe')
		resolved = routeResolver.route.resolve('AboutMe')
		it 'Resolving controllers', () ->
			expect(resolved.controller).toBe("AboutMeCtrl")
			return
		it 'Resolving views', () ->
			expect(resolved.templateUrl.indexOf("/views/about-me.html")).toBe(0)
			return
		return
	###
	describe 'RouteProvider resolving pages', () ->
		#Can't mix module and injector$injector = angular.module 'RouteProvider'
		
		return
	###
	return
