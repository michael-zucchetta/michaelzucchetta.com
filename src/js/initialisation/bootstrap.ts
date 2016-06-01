requirejs.config({
	baseUrl: '/',

	paths: {
		'angular': '../lib/angularjs/angular.min',
		"uiRouter": '../lib/ui-router/release/angular-ui-router',
		'angularResource': '../lib/angular-resource/angular-resource.min',
		'angularCss': '../lib/angular-css/angular-css.min',
		'jQuery': '../lib/jquery/dist/jquery.min',
		'lodash': '../lib/lodash/lodash.min',
		'main': 'js/initialisation/main'
	},

	shim: {
		'angular' : {
			exports : 'angular'
		},
		'uiRouter': {
			deps: ['angular'],
			exports: 'uiRouter'
		},
		'angularMocks': {
			deps: ['angular'],
			exports: 'angularMocks'
		},
		'angularResource': {
			deps: ['angular'],
			exports: 'angularResource'
		},
		'angularCss': {
			deps: ['angular'],
			exports: 'angularCss'
		},
		'main': {
			deps: ['angular', 'uiRouter', 'angularCss'],
			exports: 'main'
		}
	}
});

requirejs(['main'], (app: any) => {
		console.log(app);
});
