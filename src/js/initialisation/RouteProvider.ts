import angular = require('angular');
import RouteResolver from 'js/services/RouteResolverService';

// move angular bootstrap to another class
// let serviceModule = angular.module('RouteResolverServices', ['ngRoute', 'angularCSS']);
// must be a provider since it will be injected into module.config()
// serviceModule.provider('RouteResolverService', new RouteResolver());

// let app = angular.module('RouteProvider', ['RouteResolverServices', 'ngRoute', 'constants']);

// app.config(['$routeProvider', 'RouteResolverServiceProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide']); 

class RouteDecorator {

	constructor($delegate, RouteResolverServiceProvider, $routeProvider) {
		let $route = $delegate;
		$route.route =  RouteResolverServiceProvider.route;
			//default view
		$routeProvider.when('/home.html', {
			templateUrl: 'home.html'
		});
		// I allow routes to be defined after the application has been
		// bootstrapped. These go into a shared "routes" collection.
			
		$route.when = (path: string, route: string) => {
			$routeProvider.when(path, route);
			return this;
		};

		$route.otherwise = (path: string) => {
			$routeProvider.otherwise(path);
			return this;
		};

		return $route;
	}

}

RouteDecorator.$inject = ['$delegate', 'RouteResolverServiceProvider', '$routeProvider'];

class SetProvideDecorator {
	constructor($provide) {
		$provide.decorator('$route', RouteDecorator);
	}
}
SetProvideDecorator.$inject = ['$provide'];

class Register {
	public controller: Function;
	public directive: Function;
	public filter: Function;
	public factory: any;
	public service: any;
}

class RouteProvider {

	constructor($routeProvider, RouteResolverServiceProvider, $controllerProvider, $compileProvider, $filterProvider, $provide: ng.auto.IProvideService) {
		/*this.register = new Register();
		// Change default views and controllers directory using the following:
		// routeResolverProvider.routeConfig.setBaseDirectories('/app/views', '/app/controllers');
		this.register.controller = $controllerProvider.register;
		this.register.directive = $compileProvider.directive;
		this.register.filter = $filterProvider.register;
		this.register.factory = $provide.factory;
		this.register.service = $provide.service;*/ 
		// $provide.decorator('$route', RouteDecorator);
	}
		
	public register: Register;

}

RouteProvider.$inject = ['$routeProvider', 'RouteResolverServiceProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];
// serviceModule.config(new RouteProvider());
export default RouteProvider;
