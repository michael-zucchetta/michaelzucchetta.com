var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		app: './js/initialisation/main.ts',
		vendor: ['angular', 'ui-router', 'angular-css', 'ng-file-upload', 'lodash', 'jQuery'],
	},
	context: __dirname + '/src/',
	devtool: 'source-map',
	output: {
		path: __dirname + '/dist/',
		filename: 'bundle.js',
	},
	externals: {
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
		root: [
			path.resolve('./src'),
		],
		alias: {
			'angular': __dirname + '/lib/angular/angular.min',
			'ui-router': __dirname + '/lib/ui-router/release/angular-ui-router.min',
			'angular-css': __dirname + '/lib/angular-css/index',
			'oclazyload': __dirname + '/node_modules/oclazyload/dist/ocLazyLoad',
			'lodash': __dirname + '/lib/lodash/dist/lodash.min',
			'ng-file-upload': __dirname + '/lib/ng-file-upload/ng-file-upload.min',
			'jQuery': __dirname + '/lib/jquery/dist/jquery.min',
		},
	},
	module: {
		loaders: [
			{ test: /\.ts$/, loader: 'ts-loader' },
			{ test: /\.html$/, loader: 'html-loader' },
			{ test: /\.scss$/, loaders: ['style', 'css','sass'] },
		],
	},
	resolveLoader: {
		root: [
			path.join(__dirname, "node_modules"),
			path.resolve('./lib')
		],
		fallback: path.join(__dirname, "node_modules"),
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			chunks: ['build1'],
			filename: 'vendor.js',
			minChunks: Infinity,
		}),
		// new webpack.HotModuleReplacementPlugin(),
		// new webpack.ProvidePlugin({
		//      $: 'jquery',
		//      angular: 'angular',
		//      _: 'lodash',
		//}),
	],
}
