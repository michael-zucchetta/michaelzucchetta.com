import Constants from 'js/services/constants';
import mz from 'domains';

// move angular bootstrap to another class
// let serviceModule = angular.module('RouteResolverServices', ['ngRoute', 'angularCSS']);
// must be a provider since it will be injected into module.config()
// serviceModule.provider('RouteResolverService', new RouteResolver());

class Register {
	public controller: Function;
	public directive: Function;
	public filter: Function;
	public factory: any;
	public service: any;
}

let RouteProvider: Function = ($stateProvider, $urlRouterProvider, $controllerProvider: ng.IControllerProvider, $compileProvider: ng.ICompileProvider, $filterProvider: ng.IFilterProvider, $provide: ng.auto.IProvideService): Register => {
	let register = new Register();
	register.controller = $controllerProvider.register;
	register.directive = $compileProvider.directive;
	register.filter = $filterProvider.register;
	register.factory = $provide.factory;
	register.service = $provide.service;
	let routeDecorator: any = ($delegate: any) => {
		let $route: any = $delegate;
		$route.state =  $stateProvider.state;

		$route.setRouteDinamically = (menu: mz.IMenuEl[]): void => {
			let route = $route.route;
			_.each(menu, (menuItem: mz.IMenuEl) => {
				if (menuItem.active) {
					$route.state(menuItem.name, menuItem.definition);
				}
			});
			// $route.reload();
		};

		return $route;

	};

	$provide.decorator('$state', routeDecorator);
	return register;
};

RouteProvider.$inject = ['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];

export default RouteProvider;
