var path = require('path');
var webpack = require('webpack');

module.exports = {  
	entry: './js/initialisation/main.ts',
	context: __dirname + '/src/',
	devtool: 'source-map',
	output: {
		path: __dirname + '/dist/',
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
		root: [
			path.resolve('./src'),
			path.resolve('./lib'),
		],
		alias: {
			'angular': 'angular/angular.min',
			'ui-router': 'ui-router/release/angular-ui-router.min',
			'angular-css': 'angular-css/index',
			'oclazyload': __dirname + '/node_modules/oclazyload/dist/ocLazyLoad',
			'lodash': 'lodash/dist/lodash.min',
		},
	},
	module: {
		loaders: [
		{ test: /\.ts$/, test2: /\.js$/, loader: 'ts-loader' },
		{ test: /\.html$/, loader: 'html-loader' },
		]
	},
	resolveLoader: {
		root: [
			path.join(__dirname, "node_modules"),
			path.resolve('./lib')
		],
		fallback: path.join(__dirname, "node_modules"),
	},
}
