import angular = require('angular');

let module = angular.module('michaelzucchetta', ['ngRoute', 'angularCSS']);
module.run([() => {
}]);

class AngularBootstrap implements ng.IAngularBootstrapConfig {
	constructor($routeProvider, $locationProvider, $controllerProvider, $provide, $compileProvider) {
		let app: ng.IModule = module;
		// http://www.bennadel.com/blog/2554-loading-angularjs-components-with-requirejs-after-application-bootstrap.htm
		angular.extend(app, {
			// keep the older references.
			_controller: app.controller,
			_service: app.service,
			_factory: app.factory,
			_value: app.value,
			_directive: app.directive,
			_component: app.component,

			controller: (name: string, constructorController: Function) => {
				$controllerProvider.register(name, constructorController);
				return app;
			},

			service: (name: string, constructor: Function) => {
				$provide.service(name, constructor);
				return app;
			},

			factory: (name: string, factory: any[]) => {
				$provide.factory(name, factory);
				return app;
			},
			
			value: (name: string, value: any) => {
				$provide.value(name, value);
				return app;
			},

			directive: (name: string, factory: ng.IDirectiveFactory) => {
				$compileProvider.directive(name, factory);
				return app;
			},

			component: (name: string, options: ng.IComponentOptions) => {
				$compileProvider.component(name, options);
				return app;
			}
		});
		// NOTE: You can do the same thing with the "filter"
		// and the "$filterProvider"; but, I don't really use
		// custom filters.
	}
};

AngularBootstrap.$inject = ['$routeProvider', '$locationProvider', '$controllerProvider', '$provide', '$compileProvider'];

module.config(AngularBootstrap);
angular.element().ready(() => angular.bootstrap(document, ['michaelzucchetta']));
