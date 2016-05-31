import Constants from 'js/services/Constants';
import MenuEl from 'domains/menu';
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
			// default view
			// $stateProvider.state('home', {
			//	url: '/home.html',
			//	templateUrl: '<home></home>'
			// });

			$route.state = (name: string, definition) => {
				$stateProvider.state(name, definition);
				return this;
			};

			$route.otherwise = (path: string) => {
				$urlRouterProvider.otherwise(path);
				return this;
			};
			// $route.otherwise(Constants.DEFAULT_PAGE);

			$route.setRouteDinamically = (menu: MenuEl[]): void => {
				let route = $route.route;
				_.each(menu, (menuItem: MenuEl) => {
					if (menuItem.active) {
						$route.state(menuItem.name, menuItem.status);
					}
				});
				$route.reload();
			};

			return $route;

	};

	$provide.decorator('$state', routeDecorator);
	return register;
};

RouteProvider.$inject = ['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];

export default RouteProvider;
