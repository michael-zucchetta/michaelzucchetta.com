var tests = [];
for (var file in window.__karma__.files) {
	if (/Spec\.js$/.test(file)) {
		tests.push(file);
	}
	if (/utils\/*.js/.test(file)) {
	//	var tmp = window.__karma__.files[file];
	//	 window.__karma__.files[file] = undefined;
	//	window.__karma__.files[file.substring(0, file.length - 3)] = '.js' + tmp; 
	//	console.log( window.__karma__.files[file] );
	}
}
requirejs.config({
	// Karma serves files from '/base'
	baseUrl: '/base/dist',

	paths: {
		"jquery": "../lib/jquery/dist/jquery.min",
		"lodash": "../lib/lodash/lodash",
		"angular": "../lib/angular/angular.min",
		"angular-route": "../lib/angular-route/angular-route.min",
		"angular-mocks": "../lib/angular-mocks/angular-mocks",
		"angular-css": "../lib/angular-css/angular-css.min"
	},

	shim: {
		'angular': {
			exports: 'angular'
		},
		'angular-mocks': {
			deps: ['angular']
		}
	},

	// ask Require.js to load these files (all our tests)
	deps: tests,

	// start test run, once Require.js is done
	callback: window.__karma__.start
});
requirejs(
        [
                'angular',
                'jquery',
                'lodash',
                'angular-mocks',
                // Load our app module and pass it to our definition function
        ],
        function(){
		console.log("HOOOI");
	}
);
