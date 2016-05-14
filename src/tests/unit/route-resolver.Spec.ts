import RouteResolver from 'js/services/RouteResolverService';
import RouteProvider from 'js/initialisation/RouteProvider';
import Utilities from 'js/services/UtilitiesService';

let location,
	route,
	httpBackend,
	UtilitiesService;

console.log('Needed for force the require', RouteResolver);

jasmine.getJSONFixtures().fixturesPath = '/base/dist/js/mocks/';

describe('RouteResolverService resolving names to objects', () => {
	beforeEach(() => {
		angular.mock.module('RouteResolverServices');
	});
	// ng and ngMock modules are necessary for mocking rootElement, because angular-css is using rootElement and here it is using location, and if you use location before rootElement, it is necessary to mock it
	let service = angular.module('RouteResolverServices', ['ngRoute', 'angularCSS']);
	service.provider('RouteResolverService', new RouteResolver());
	let $injectorModule: ng.auto.IInjectorService = angular.injector([ 'ng', 'ngMock', 'RouteResolverServices' ]);
	let routeResolver = $injectorModule.get<RouteResolver>('RouteResolverService');
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
		// angular.mock.module('common');
		console.log('fea', Utilities);
		angular.mock.module.apply('common');
		inject(($location, $route, $httpBackend) => {
			location = $location;
			route = $route;
			httpBackend = $httpBackend;
		});
		let $injectorModule: ng.auto.IInjectorService = angular.injector([ 'ng', 'ngMock', 'common' ]);
		UtilitiesService = $injectorModule.get('UtilitiesService');
		// Set dynamic routes from mock
		UtilitiesService.setRouteDinamically(getJSONFixture('menu.json'));
		httpBackend.expect('GET', '/views/about-me.html')
			.respond(200);
		httpBackend.expect('GET', '/js/ctrl/AboutMeCtrl.js')
			.respond(200);
	});
	
	let service = angular.module('RouteResolverServices', ['ngRoute', 'angularCSS']);
	service.provider('RouteResolverService', new RouteResolver());
	let routeProviderService = angular.module('RouteProvider', ['RouteResolverServices']);	
	routeProviderService.config(RouteProvider);
	
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
