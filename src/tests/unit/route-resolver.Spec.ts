import RouteResolver from 'js/services/RouteResolverService';
let location,
	route,
	rootScope,
	httpBackend,
	UtilitiesService;

console.log('Needed for force the requrie', RouteResolver);

jasmine.getJSONFixtures().fixturesPath = '/base/dist/js/mocks/';

describe('RouteResolverService resolving names to objects', () => {
	beforeEach(() => angular.mock.module('RouteResolverServices'));
	// ng and ngMock modules are necessary for mocking rootElement, because angular-css is using rootElement and here it is using location, and if you use location before rootElement, it is necessary to mock it
	let $injectorModule: ng.auto.IInjectorService = angular.injector([ 'ng', 'ngMock', 'RouteResolverServices' ]);
	let routeResolver: RouteResolver = $injectorModule.get<RouteResolver>('RouteResolverServices');
	console.log('Route Provider ' +  routeResolver.route.resolve('AboutMe'));
	let resolved = routeResolver.route.resolve('AboutMe');
	it('Resolving controllers', () => {
		expect(resolved.controller).toBe('AboutMeCtrl');
	});
	it('Resolving views', () => {
		expect(resolved.templateUrl.indexOf('/views/about-me.html')).toBe(0);
	});
});

describe('RouteProvider resolving pages', () => {
	beforeEach(() => {
		angular.mock.module('RouteResolverServices');
		angular.mock.module('RouteProvider');
		// module 'common');
		inject((_$location_, _$route_, _$httpBackend_, _UtilitiesService_) => {
			location = _$location_;
			route = _$route_;
			httpBackend = _$httpBackend_;
			UtilitiesService = _UtilitiesService_;
		});
		// Set dynamic routes from mock
		UtilitiesService.setRouteDinamically(getJSONFixture('menu.json'));
		httpBackend.expect('GET', '/views/about-me.html')
			.respond(200);
		httpBackend.expect('GET', '/js/ctrl/AboutMeCtrl.js')
			.respond(200);
	});		
	
	let requestPath = '/functionalities/1';
	// Can't mix module and injector$injector = angular.module 'RouteProvider'
	it('should resolve "AboutMeCtrl" controller requesting ' + requestPath, () => {
		location.path(requestPath);
		expect(route.routes[requestPath].controller).toBe('AboutMeCtrl');
	});

	it('should download  "/views/about-me.html" templateUrl requesting ' + requestPath, () => {
		location.path(requestPath);
		expect(route.routes[requestPath].templateUrl).toBe('/views/about-me.html');
	});

});
