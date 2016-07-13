var webpackConfig = require('../webpack.config');

module.exports = function(config) {
	var configuration = {
		//Needed for avoiding absolute Path
		basePath: '../src/',
		frameworks: ['jasmine-jquery', 'jasmine'],
		preprocessors: {
			'index.unit.spec.ts': ['coverage', 'sourcemap', 'webpack'],
			// '**/*(!spec).ts': ['coverage'],
			'coverage.ts': ['coverage', 'webpack'],
		},

		coverageReporter: {
			dir: '../coverage/',
			reporters: [
			{ type: 'text-summary' },
			{
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
			src: './coverage/coverage-final.json',
			reports: {
				html: './coverage/report/',
				'text': null,
			},
			timeoutNotCreated: 5000,
			timeoutNoMoreFiles: 1000
		},

		webpack: {
			resolve: webpackConfig.resolve,
			module: webpackConfig.module,
			verbose: true,
		      	// devtool: 'inline-source-map',
		      	// to debug, eval is necessary
			devtool: 'eval',
		      	separateStylesheet: true,
		      	debug: true,
		      	devServer: true,
		      	noHappypack: true,
		      	testEnv: true,
			verbose: true,
		},

		files: [
			'../lib/angular/angular.min.js',
			'../lib/angular-mocks/angular-mocks.js',
			'../lib/ui-router/release/angular-ui-router.min.js',
			'../lib/lodash/dist/lodash.min.js',
			'index.unit.spec.ts',
			'coverage.ts',
			{pattern: '**/*ts', included: false},
			'**/*.json',
		],
		// list of files to exclude
		exclude: [
		],

		// test results reporter to use
		reporters: ['progress', 'html', 'coverage', 
			'karma-remap-istanbul'
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
			require('karma-chrome-launcher'),
			require('karma-firefox-launcher'),
			require('karma-phantomjs-launcher'),
			require('karma-sourcemap-loader'),
			require('karma-source-map-support'),
			// require('karma-sourcemap-writer'),
			require('karma-coverage'),
			require('karma-remap-istanbul'),
		],
	};
	/* configuration.webpack.module.postLoaders = [{
		test: /\.ts$/,
		exclude: /(node_modules|lib)/,
		loader: 'istanbul-instrumenter'
	}];
	*/
	configuration.webpack.module.postLoaders =  [
	   {
                test: /\.(js|ts)$/,
                loader: 'istanbul-instrumenter-loader',
                exclude: [
                    /node_modules/,
                    /tests/,
                    /\.(e2e|spec)\.ts$/
                ]
            },
	/*{ //delays coverage til after tests are run, fixing transpiled source coverage error
         test: /\.(js|ts)$/,
         exclude: /(node_modules)\//,
         loader: 'sourcemap-istanbul-instrumenter?force-sourcemap',
       }*/
       ];
	config.set(configuration);
};
