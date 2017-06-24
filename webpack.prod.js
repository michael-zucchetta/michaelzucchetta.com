const webpack = require('webpack');
const Merge = require('webpack-merge');
const CompressionPlugin = require("compression-webpack-plugin");

const CommonConfig = require('./webpack.config.js');

module.exports = Merge(CommonConfig, {
	devtool: false,
	plugins: [
		//new webpack.LoaderOptionsPlugin({
		//	minimize: true,
		//	debug: false
		//}),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0
		})

	]
})

