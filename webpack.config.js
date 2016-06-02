var path = require('path');
var webpack = require('webpack');

module.exports = {  
  entry: './js/initialisation/main.ts',
  context: __dirname + '/src/',
  output: {
    filename: 'dist/bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
    root: [
    	path.resolve('./src'),
	path.resolve('./lib'),
    ],
	  alias: {
	  	'ui-router': 'ui-router/release/angular-ui-router',
	  	'angular-css': 'angular-css/index',
	  },
  },
  module: {
    loaders: [
      { test: /\.ts$/, test2: /\.js$/, loader: 'ts-loader' }
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
