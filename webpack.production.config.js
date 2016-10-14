var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

// local css 
loaders.push({
	test: /[\/\\]src[\/\\].*\.css$/,
	loader: ExtractTextPlugin.extract('style', 'css')
});
// local less modules
loaders.push({
	test: /[\/\\]src[\/\\].*\.less$/,
	loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less')
});
// global css files
loaders.push({
	test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
	loader: ExtractTextPlugin.extract('style', 'css')
});

module.exports = {
	entry: [
		'./src/app.js'
	],
	output: {
		// path: path.join(__dirname, 'public'),
		path: path.join(__dirname, '../../Documents/root/public/village'),
		// filename: '[chunkhash].js'
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders
	},
	plugins: [
		// new WebpackCleanupPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				// drop_console: true,
				drop_console: false,
				drop_debugger: true
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		// new ExtractTextPlugin('[contenthash].css', {
		new ExtractTextPlugin('bundle.css', {
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: './src/template.html',
			title: '空店后台管理系统'
		})
	]
};
