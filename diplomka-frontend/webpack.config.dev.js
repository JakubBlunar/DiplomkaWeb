import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import scannerWebpack from './tools/scannerWebpack'

const ASSET_PATH = process.env.ASSET_PATH || '/'

const GLOBALS = {
	'process.env.NODE_ENV': JSON.stringify('development'),
	__DEV__: true,
	'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
}

export default {
	mode: 'development',
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json']
	},
	devtool: 'source-map', // more info: https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/
	entry: [
		// must be first entry to properly set public path
		'./src/webpack-public-path',
		'babel-polyfill',
		'react-hot-loader/patch',
		'webpack-hot-middleware/client?reload=true',
		path.resolve(__dirname, 'src/index.jsx') // Defining path seems necessary for this to work consistently on Windows machines.
	],
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
		publicPath: ASSET_PATH,
		filename: 'bundle.js'
	},
	plugins: [
		// Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
		new webpack.DefinePlugin(GLOBALS),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({ // Create HTML file that includes references to bundled CSS and JS.
			template: 'src/index.ejs',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			inject: true
		}),
		new scannerWebpack()
	],
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: ['babel-loader']
		}, {
			test: /\.eot(\?v=\d+.\d+.\d+)?$/,
			use: ['file-loader']
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					mimetype: 'application/font-woff'
				}
			}]
		}, {
			test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					mimetype: 'application/octet-stream'
				}
			}]
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					mimetype: 'image/svg+xml'
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
			use: ['style-loader', {
				loader: 'css-loader',
				options: {
					sourceMap: true
				}
			}, {
				loader: 'postcss-loader',
				options: {
					plugins: () => [
						require('autoprefixer')
					],
					sourceMap: true
				}
			}, {
				loader: 'less-loader'
			}]
		}]
	}
}
