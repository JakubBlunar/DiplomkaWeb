// For info about this file refer to webpack and webpack-hot-middleware documentation
// For info on how we're generating bundles with hashed filenames for cache busting: https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.w99i89nsz
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'

const GLOBALS = {
	'process.env.NODE_ENV': JSON.stringify('production'),
	__DEV__: false
}

export default {
	mode: 'production',
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json']
	},
	entry: ['babel-polyfill', path.resolve(__dirname, 'src/index.jsx')],
	devtool: process.env.WITH_MAPS ? 'source-map' : undefined,
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].[chunkhash].js'
	},
	optimization: {
		runtimeChunk: true,
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true
				}
			}
		},
		minimizer: [
			new UglifyJsPlugin({
				parallel: true,
				cache: true,
				sourceMap: !!process.env.WITH_MAPS,
				uglifyOptions: {
					compress: true,
					output: {
						comments: false
					} 
				}
			}),
			new OptimizeCSSAssetsPlugin({
				cssProcessorOptions: { discardComments: { removeAll: true } },
			})
		]
	},
	plugins: [
		// Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
		new webpack.DefinePlugin(GLOBALS),

		new MiniCssExtractPlugin({
			filename: "[name].[hash].css",
			chunkFilename: "[id].[hash].css"
		}),

		// Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
		new HtmlWebpackPlugin({
			template: 'src/index.ejs',
			favicon: 'src/favicon.ico',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true,
			// Note that you can add custom options here if you need to handle other custom logic in index.html
			// To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
			trackJSToken: ''
		}),
		
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /sk/),

		new ProgressBarPlugin(),
	],
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: ['babel-loader']
		}, {
			test: /\.eot(\?v=\d+.\d+.\d+)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					name: '[name].[ext]'
				}
			}]
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					mimetype: 'application/font-woff',
					name: '[name].[ext]'
				}
			}]
		}, {
			test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					mimetype: 'application/octet-stream',
					name: '[name].[ext]'
				}
			}]
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					mimetype: 'image/svg+xml',
					name: '[name].[ext]'
				}
			}]
		}, {
			test: /\.(jpe?g|png|gif|ico)$/i,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			}]
		}, {
			test: /(\.css|\.less)$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader', 
				{
					loader: 'postcss-loader',
					options: {
						plugins: () => [
							require('autoprefixer')
						],
					}
				}, 
				{
					loader: 'less-loader'
				}
			]
		}]
	}
}
