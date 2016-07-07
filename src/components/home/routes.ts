routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider: any, $urlRouterProvider: angular.ui.IUrlRouterProvider): void {
	$stateProvider
		.state('home', {
			url: '/home.html',
			component: 'home',
		});
	$urlRouterProvider.otherwise('home.html');
}
