module.exports = function(config) {
	config.set({
		//Neded for avoiding absolute Path
		basePath: '../',
		frameworks: ['jasmine', 'requirejs'],
		files: [
			{pattern: 'tests/unit/*Spec.js', included: false},
			{pattern: 'example/*.js', included: false},
			{pattern: 'src/js/**/*.js', included: false},
			{pattern: 'lib/**/*.js', included: false},
			'src/js/initialisation/requirejs-bootstrap-test.js'
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
			subPageTitle: 'A sample project description'
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
		}
	});
};
