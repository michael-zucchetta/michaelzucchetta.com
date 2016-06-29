var webpackConfig = require('../webpack.config');

module.exports = function(config) {
	config.set({
		//Neded for avoiding absolute Path
		basePath: '../src/',
		frameworks: ['jasmine-jquery', 'jasmine'],
	        preprocessors: {
			//'dist/**/*.ts': ['sourcemap']
			'dist/**/*.ts': ['sourcemap'],
			'index.unit.spec.ts': ['webpack'],
			'src/**/!(spec|mock)/*.ts': ['coverage'],
		},
		coverageReporter: {
			dir: 'coverage/',
			reporters: [{
			  type: 'html',
			  subdir: 'html',
			}, {
			  type: 'text-summary',
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
		webpack: {
			module: webpackConfig.module,			
			resolve: webpackConfig.resolve,
		},

		files: [
			'index.unit.spec.ts',
			'**/*.json',
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
			require('karma-coverage'),
			require('karma-chrome-launcher'),
			require('karma-firefox-launcher'),
			require('karma-phantomjs-launcher'),
			require('karma-sourcemap-loader'),
		],
	});
};
