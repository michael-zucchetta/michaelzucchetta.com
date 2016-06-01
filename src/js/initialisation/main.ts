import angular = require('angular');
import Constants from 'js/services/Constants';
import RouteProvider from 'js/initialisation/RouteProvider';
// import homeOpts from 'components/home/home.component';

// move angular bootstrap to another class
// must be a provider since it will be injected into module.config()
let routeProviderService: ng.IModule = angular.module(Constants.ROUTE_PROVIDER, ['ui.router', 'angularCSS']);
routeProviderService.config(RouteProvider);
let module: ng.IModule = angular.module(Constants.MAIN_MODULE, [Constants.ROUTE_PROVIDER, 'angularCSS']);
// removing the function argument in the run invocation results in an error 
module.run([() => {
}]);

class AngularBootstrap implements ng.IAngularBootstrapConfig {

	constructor($stateProvider, $locationProvider: ng.ILocationProvider, $controllerProvider: ng.IControllerProvider, $provide: ng.auto.IProvideService, $compileProvider: ng.ICompileProvider, $urlRouterProvider) {
		let app: ng.IModule = module;
		// http://www.bennadel.com/blog/2554-loading-angularjs-components-with-requirejs-after-application-bootstrap.htm
		angular.extend(app, {
			// keep the older references.
			_component: app.component,
			_controller: app.controller,
			_directive: app.directive,
			_factory: app.factory,
			_service: app.service,
			_value: app.value,

			controller: (name: string, constructorController: Function): ng.IModule => {
				$controllerProvider.register(name, constructorController);
				return app;
			},

			service: (name: string, constructor: Function): ng.IModule => {
				$provide.service(name, constructor);
				return app;
			},

			factory: (name: string, factory: any[]): ng.IModule => {
				$provide.factory(name, factory);
				return app;
			},

			value: (name: string, value: any): ng.IModule => {
				$provide.value(name, value);
				return app;
			},

			directive: (name: string, factory: ng.IDirectiveFactory): ng.IModule => {
				$compileProvider.directive(name, factory);
				return app;
			},

			component: (name: string, options: ng.IComponentOptions): ng.IModule => {
				$compileProvider.component(name, options);
				return app;
			}
		});
		// note: You can do the same thing with the "filter"
		// and the "$filterProvider"; but, I don't really use
		// custom filters.
		$stateProvider.state('home', {
			url: '/home.html',
			template: '<home></home>'
		});
		$urlRouterProvider.otherwise(Constants.DEFAULT_PAGE);
	}
};

AngularBootstrap.$inject = ['$stateProvider', '$locationProvider', '$controllerProvider', '$provide', '$compileProvider', '$urlRouterProvider'];

module.config(AngularBootstrap);

let initFirstComponent = ($state) => {
	requirejs(['components/home/home.component'], (homeOpts) => {
		module.component('home', homeOpts);
		/*$state.state('home', {
			url: '/home.html',
			templateUrl: '<home></home>'
		});
		$state.otherwise(Constants.DEFAULT_PAGE);*/
	});
};

initFirstComponent.$inject = ['$state'];

export default angular.module(Constants.MAIN_MODULE);
angular.element().ready(() => {
	requirejs(['components/home/home.component'], (homeComponent) => {
		angular.bootstrap(document, [Constants.MAIN_MODULE]);
	});
});
