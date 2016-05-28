import RouteProvider from 'js/initialisation/RouteProvider';

let location: ng.ILocationService,
	route: any,
	httpBackend: ng.IHttpBackendService;

jasmine.getJSONFixtures().fixturesPath = '/base/dist/js/mocks/';

describe('RouteProvider resolving pages', () => {
	beforeEach(() => {
		angular.mock.module('RouteProvider');
		// angular.mock.module('common');
		angular.mock.module.apply('common');
		inject(($location: ng.ILocationService, $route: any, $httpBackend: ng.IHttpBackendService) => {
			location = $location;
			route = $route;
			httpBackend = $httpBackend;
		});
		// set dynamic routes from mock
		route.setRouteDinamically(getJSONFixture('menu.json'));
		httpBackend.expect('GET', '/views/about-me.html')
			.respond(200);
		httpBackend.expect('GET', '/js/ctrl/AboutMeCtrl.js')
			.respond(200);
	});

	let routeProviderService: ng.IModule = angular.module('RouteProvider', []);
	routeProviderService.config(RouteProvider);

	let requestPath: string = '/functionalities/1';
	// can't mix module and injector$injector = angular.module 'RouteProvider'
	it('should resolve "AboutMeCtrl" controller requesting ' + requestPath, () => {
		location.path(requestPath);
		expect(route.routes[requestPath].controller).toBe('AboutMeCtrl');
	});

	it('should download  "/views/about-me.html" templateUrl requesting ' + requestPath, () => {
		location.path(requestPath);
		expect(route.routes[requestPath].templateUrl).toBe('/views/about-me.html');
	});

});
