module.exports = function(config) {
	config.set({
		//Neded for avoiding absolute Path
		basePath: '../',
		frameworks: ['jasmine-jquery', 'jasmine'],
	        preprocessors: {
			'dist/**/*.js': ['sourcemap']
		},	  
		files: [
			{pattern: 'lib/jquery/dist/jquery.min.js'},
			{pattern: 'lib/angular/angular.min.js'},
			{pattern: 'lib/lodash/lodash.min.js'},
			{pattern: 'dist/js/**/*.js', included: true},
			{pattern: 'dist/tests/**/unit/*Spec.js', included: true},
			{pattern: 'dist/js/**/*.json', included: false},
			{pattern: 'src/**/*.ts', included: false},
			{pattern: 'lib/**/*.map', included: false}
		],
		// list of files to exclude
		exclude: [
		],

		// test results reporter to use
		reporters: ['progress', 'html'],
	

		// used to see the page on the browser
		htmlReporter: {
			outputFile: 'tests/units.html',
			// Optional 
			pageTitle: 'Unit Tests',
			subPageTitle: 'A sample project description',
			focusOnFailures: true
		},

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// Start these browsers
		browsers: ['Chrome'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false,

		// Enable console.log printing on terminal
		client: {
			captureConsole: true,
		},

		plugins: [
			'karma-html-reporter',
			'karma-jasmine',
			'karma-jasmine-jquery',
			'karma-requirejs',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-sourcemap-loader'
		]
	});
};
