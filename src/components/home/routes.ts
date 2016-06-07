routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/home.html',
			component: 'home',
    		});
    $urlRouterProvider.otherwise('home.html');
}
