import mz from 'domains';

// move angular bootstrap to another class
// let serviceModule = angular.module('RouteResolverServices', ['ngRoute', 'angularCSS']);
// must be a provider since it will be injected into module.config()
// serviceModule.provider('RouteResolverService', new RouteResolver());

interface IRegister {
	controller: Function;
	directive: Function;
	filter: Function;
	factory: any;
	service: any;
}

class Register implements IRegister {
	public controller: Function;
	public directive: Function;
	public filter: Function;
	public factory: any;
	public service: any;
}

let RouteProvider: Function = ($stateProvider: angular.ui.IStateProvider,
				$urlRouterProvider: angular.ui.IUrlRouterProvider,
				$controllerProvider: ng.IControllerProvider,
				$compileProvider: ng.ICompileProvider,
				$filterProvider: ng.IFilterProvider,
				$provide: ng.auto.IProvideService): Register => {
	let register: IRegister = new Register();
	register.controller = $controllerProvider.register;
	register.directive = $compileProvider.directive;
	register.filter = $filterProvider.register;
	register.factory = $provide.factory;
	register.service = $provide.service;
	let routeDecorator: any = ($delegate: any) => {
		let $route: any = $delegate;
		$route.state =  $stateProvider.state;

		$route.setRouteDinamically = (menu: mz.IMenuEl[]): void => {
			_.each(menu, (menuItem: mz.IMenuEl) => {
				if (menuItem.active) {
					console.log('putting element in menu', menuItem.definition);
					menuItem.definition.params = {
						menuUuid: menuItem.menuUuid,
						postUuid: menuItem.postUuid,
					};
					console.log('putting element in menu', menuItem.definition);
					$route.state(menuItem.title.replace(/\ /g, '').toLowerCase(), menuItem.definition);
				}
			});
			// Manual setting of hidden ones
			$route.state('login', {
				url: '/login.html',
				component: 'login',
			});
			// need to handle the page component so that in logged version it's possible to insert/edit
			// MAYBE
			$route.state('admin', {
				url: '/page-admin.html',
				component: 'pageAdmin',
			});
			//$route.reload();
		};

		return $route;

	};

	$provide.decorator('$state', routeDecorator);
	return register;
};

RouteProvider.$inject = ['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];

export default RouteProvider;
