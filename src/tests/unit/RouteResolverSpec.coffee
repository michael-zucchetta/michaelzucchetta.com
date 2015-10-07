routeResolverService = 'RouteResolverService'
routeProvider = 'RouteProvider'
define [routeResolverService, routeProvider, 'angularRoute', 'angularMocks'], () ->
	location = route = rootScope = httpBackend = null
	
	describe 'RouteResolverService resolving names to objects', () ->
		beforeEach () ->
			module('RouteResolverServices')
			return
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
	
	describe 'RouteProvider resolving pages', () ->
		beforeEach () ->
			module 'RouteResolverServices'
			module 'RouteProvider'
			return
		beforeEach inject (_$location_, _$route_, _$httpBackend_) ->
			location = _$location_
			route = _$route_
			httpBackend = _$httpBackend_
			return
		beforeEach () ->
			httpBackend.expect 'GET', "/views/about-me.html"
				.respond 200
		beforeEach () ->
			httpBackend.expect 'GET', "/js/mocks/menu.json"
				.respond 200
			return
		beforeEach () ->
			httpBackend.expect 'GET', "/js/ctrl/AboutMeCtrl.js"
				.respond 200
			return
		
		requestPath = '/functionalities/1'
		#Can't mix module and injector$injector = angular.module 'RouteProvider'
		it 'should resolve "AboutMeCtrl" controller requesting ' + requestPath, () ->
			location.path requestPath
			expect(route.routes[requestPath].controller).toBe("AboutMeCtrl")
			return
		
		it 'should download  "/views/about-me.html" templateUrl requesting ' + requestPath, () ->
			location.path requestPath
			expect(route.routes[requestPath].templateUrl).toBe("/views/about-me.html")
			return

		return
	return
return
