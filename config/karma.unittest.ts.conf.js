var webpackConfig = require('../webpack.config');

module.exports = function(config) {
	config.set({
		//Neded for avoiding absolute Path
		basePath: '../src/',
		frameworks: ['jasmine-jquery', 'jasmine'],
	        preprocessors: {
			'index.unit.spec.ts': ['webpack', 'sourcemap', 'coverage'],
			'src/**/*.ts': ['coverage'],
		},

		coverageReporter: {
			dir: '../coverage/',
			reporters: [{
				type: 'json',
				subdir: '.', 
				file: 'coverage-final.json'
			}],
			check: {
				global: {
					statements: 95,
					branches: 95,
					functions: 95,
					lines: 95,
				},
			},
		},

		remapIstanbulReporter: {
			src: 'coverage/coverage-final.json',
			reports: {
				html: 'coverage'
			},
			timeoutNotCreated: 1000,
			timeoutNoMoreFiles: 1000
		},

		webpack: {
			module: webpackConfig.module,			
			resolve: webpackConfig.resolve,
			devtool: '#inline-source-map',
		},

		files: [
			'index.unit.spec.ts',
			{pattern: '**/*ts', included: false},
			'**/*.json',
		],
		// list of files to exclude
		exclude: [
		],

		// test results reporter to use
		// reporters: ['progress', 'coverage', 'karma-remap-istanbul', 'html'],
		reporters: ['progress', 'html', 'coverage', 
			//'karma-remap-istanbul'
		],

		// used to see the page on the browser
		htmlReporter: {
			outputFile: 'tests/units.html',
			// Optional 
			pageTitle: 'Unit Tests',
			subPageTitle: 'A sample project description',
			focusOnFailures: true
		},

		// web server port
		port: 9897,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// Start these browsers
		browsers: ['Chrome'],
		// browsers: ['PhantomJS'],

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
			// 'karma-html-reporter',
			require('karma-webpack'),
			require('karma-jasmine-html-reporter-livereload'),
			require('karma-jasmine'),
			require('karma-jasmine-jquery'),
			require('karma-remap-istanbul'),
			require('karma-coverage'),
			require('karma-chrome-launcher'),
			require('karma-firefox-launcher'),
			require('karma-phantomjs-launcher'),
			require('karma-sourcemap-loader'),
		],
	});
};
