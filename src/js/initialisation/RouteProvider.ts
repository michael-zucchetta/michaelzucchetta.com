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

let RouteProvider: Function = ($routeProvider: ng.route.IRouteProvider, RouteResolverServiceProvider, $controllerProvider: ng.IControllerProvider, $compileProvider: ng.ICompileProvider, $filterProvider: ng.IFilterProvider, $provide: ng.auto.IProvideService): Register => {
	let register = new Register();
	register.controller = $controllerProvider.register;
	register.directive = $compileProvider.directive;
	register.filter = $filterProvider.register;
	register.factory = $provide.factory;
	register.service = $provide.service;
	let routeDecorator: any = ($delegate: any) => {
			let $route: any = $delegate;
			$route.route =  RouteResolverServiceProvider.route;
			// default view
			$routeProvider.when('/home.html', {
				templateUrl: 'home.html'
			});
			// allow routes to be defined after the application has been
			// bootstrapped. These go into a shared "routes" collection.

			$route.when = (path: string, route: string) => {
				$routeProvider.when(path, route);
				return this;
			};

			$route.otherwise = (path: string) => {
				$routeProvider.otherwise(path);
				return this;
			};
			$route.otherwise(Constants.DEFAULT_PAGE);

			$route.setRouteDinamically = (menu: MenuEl[]): void => {
				let route = $route.route;
				_.each(menu, (menuItem: MenuEl) => {
					if (menuItem.active) {
						$route.when('/' + Constants.FUNCTIONS_PREFIX + '/' + menuItem.id, route.resolve(menuItem.name));
					}
				});
				$route.reload();
			};

			return $route;

	};

	$provide.decorator('$route', routeDecorator);
	return register;
};

RouteProvider.$inject = ['$routeProvider', 'RouteResolverServiceProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];
// serviceModule.config(new RouteProvider());
export default RouteProvider;
