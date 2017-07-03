const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");

const vendor = ['angular', 'ui-router', 'angular-css', 'ng-file-upload', 'lodash', 'jQuery'];
module.exports = {
	entry: {
		app: './js/initialisation/main.ts',
		app_admin: './admin/',
		vendor: vendor,
		vendor_auth: ['quill', 'ng-quill'],
	},
	context: __dirname + '/src/',
	devtool: '#inline-source-map',
	output: {
		path: __dirname + '/dist/',
		filename: '[name].js',
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
			'angular-tinymce': __dirname + '/lib/angular-ui-tinymce/dist/tinymce.min',
			'tinymce': __dirname + '/lib/tinymce/tinymce.min',
			'angular-mocks': __dirname + '/lib/angular-mocks/angular-mocks',
			'ui-router': __dirname + '/lib/angular-ui-router/release/angular-ui-router.min',
			'angular-css': __dirname + '/lib/angular-css/angular-css.min',
			'lodash': __dirname + '/lib/lodash/dist/lodash.min',
			'ng-file-upload': __dirname + '/lib/ng-file-upload/ng-file-upload.min',
			'jQuery': __dirname + '/lib/jquery/dist/jquery.min',
			// noParse
			'quill': __dirname + '/lib/quill/quill.min', //'https://cdnjs.cloudflare.com/ajax/libs/quill/1.2.6/quill.min.js',
			// 'quill': __dirname + '/lib/quill/quill2',
			'ng-quill': __dirname + '/lib/ng-quill/dist/ng-quill.min'
		},
	},
	module: {
		loaders: [
			{ test: /\.ts$/, loader: 'ts-loader' },
			{ test: /\.html$/, loader: 'html-loader' },
			{ test: /\.scss$/, loaders: ['style', 'css','sass'] },
		],
		preLoaders: [
			{
				test: /\.js$/,
				loader: "source-map-loader",
			}
		]
	},
	resolveLoader: {
		root: [
			path.join(__dirname, "node_modules"),
			path.resolve('./lib')
		],
		fallback: path.join(__dirname, "node_modules"),
	},
	plugins: [
		new webpack.ProvidePlugin({ Quill: "quill" }),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			chunks: ['build1'],
			filename: 'vendor.js',
			minChunks: Infinity,
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor_auth',
			chunks: ['build1'],
			filename: 'vendor_admin.js',
			minChunks: Infinity,
		}),
		// new webpack.optimize.UglifyJsPlugin({
		//	beautify: false,
		//	mangle: {
		//		screw_ie8: true,
		//		keep_fnames: true
		//	},
		//	compress: {
		//		screw_ie8: true
		//	},
		//	comments: false
		// }),
	],
}
