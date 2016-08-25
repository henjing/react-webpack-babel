module.exports = [
	{
		test: /\.jsx?$/,
		exclude: /(node_modules|bower_components)/,
		loaders: ['react-hot', 'babel'],
	},
  { test: /\.(gif|jpg|png|woff|woff2|svg|eot|ttf)\??.*$/,
    loader: 'url-loader?limit=50000&name=[path][name].[ext]'
  }
	// {
	// 	// test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
	// 	test: /\.eot$/,
	// 	loader: "file"
	// },
	// {
	// 	test: /\.(woff|woff2)$/,
	// 	loader: "url?prefix=font/&limit=5000"
	// },
	// {
	// 	// test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
	// 	test: /\.ttf$/,
	// 	loader: "url?limit=10000&mimetype=application/octet-stream"
	// },
	// {
	// 	// test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
	// 	test: /\.svg$/,
	// 	loader: "url?limit=10000&mimetype=image/svg+xml"
	// },
	// {
	// 	test: /\.gif/,
	// 	loader: "url-loader?limit=10000&mimetype=image/gif"
	// },
	// {
	// 	test: /\.jpg/,
	// 	loader: "url-loader?limit=10000&mimetype=image/jpg"
	// },
	// {
	// 	test: /\.png/,
	// 	loader: "url-loader?limit=10000&mimetype=image/png"
	// }
];
