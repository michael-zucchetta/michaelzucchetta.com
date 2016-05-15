import angular = require('angular');
import Constants from 'js/services/Constants';
import RouteResolver from 'js/services/RouteResolverService';
import RouteProvider from 'js/initialisation/RouteProvider';

// move angular bootstrap to another class
let serviceModule: ng.IModule = angular.module('RouteResolverServices', ['ngRoute', 'angularCSS']);
// must be a provider since it will be injected into module.config()
serviceModule.provider('RouteResolverService', RouteResolver);
let routeProviderService: ng.IModule = angular.module(Constants.ROUTE_PROVIDER, [Constants.ROUTE_SERVICES]);
routeProviderService.config(RouteProvider);
let module: ng.IModule = angular.module(Constants.MAIN_MODULE, [Constants.ROUTE_PROVIDER]);
console.log(Constants.MAIN_MODULE);
// removing the function argument in the run inokation results in an error 
module.run([() => {}]);

class AngularBootstrap implements ng.IAngularBootstrapConfig {

	constructor($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider, $controllerProvider: ng.IControllerProvider, $provide: ng.auto.IProvideService, $compileProvider: ng.ICompileProvider) {
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
	}
};

AngularBootstrap.$inject = ['$routeProvider', '$locationProvider', '$controllerProvider', '$provide', '$compileProvider'];

module.config(AngularBootstrap);
angular.element().ready(() => angular.bootstrap(document, [Constants.MAIN_MODULE]));
