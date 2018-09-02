import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import config from '../webpack.config.prod'
import { chalkProcessing } from './chalkConfig'

config.plugins.push(new BundleAnalyzerPlugin())

process.env.NODE_ENV = 'production'

const compiler = webpack(config)

// eslint-disable-next-line
console.log(chalkProcessing('Building app in production mode.'))
compiler.run((error, stats) => {
	if (error) {
		throw new Error(error)
	}
	console.log(stats) // eslint-disable-line no-console
})
