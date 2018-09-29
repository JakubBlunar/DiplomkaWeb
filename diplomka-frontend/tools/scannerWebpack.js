const scanner = require('i18next-scanner')
const vfs = require('vinyl-fs')
const path = require('path')

class ScannerWebpack {
	i18nConfig = {}
	extensions = ['js', 'jsx']

	constructor(config) {
		this.i18nConfig = config || {}
	}

	apply(compiler) {
		const i18nConfig = this.i18nConfig
		const extensions = this.extensions

		compiler.hooks.emit.tapAsync('HelloCompilationPlugin', (compilation, callback) => {
			if (!i18nConfig.src) {
				i18nConfig.src = 'src'
			}

			if (!i18nConfig.dest) {
				i18nConfig.dest = 'assets'
			}

			if (!i18nConfig) {
				// eslint-disable-next-line
				console.error('i18next-scanner:', 'i18n object is missing')
				return
			}
			if (!i18nConfig.src) {
				// eslint-disable-next-line
				console.error('i18next-scanner:', 'src path is missing')
				return
			}
			if (!i18nConfig.dest) {
				// eslint-disable-next-line
				console.error('i18next-scanner:', 'dest path is missing')
				return
			}

			vfs.src(path.join(i18nConfig.src, `**/*.{${extensions.join(',')}}`))
				.pipe(scanner({
					removeUnusedKeys: true,
					sort: true,
					func: {
						list: ['i18next.t', 'i18n.t', 't'],
						extensions: ['.js', '.jsx']
					},
					trans: {
						component: 'Trans',
						i18nKey: 'i18nKey',
						defaultsKey: 'defaults',
						extensions: ['.js', '.jsx']
					},
					attr: {
						list: ['data-i18n', 'i18nKey'],
						extensions: ['.js', '.jsx']
					},
					lngs: ['en', 'sk'],
					resource: {
						loadPath: 'assets/locales/{{lng}}/{{ns}}.json',
						savePath: 'locales/{{lng}}/{{ns}}.json',
						jsonIndent: 4
					},
					ns: [
						'translation',
						'index'
					],
					defaultLng: 'en',
					defaultNs: 'translation',
					// eslint-disable-next-line
					defaultValue: function (lng, ns, key) {
						if (lng === 'en') {
							return '_NOT_TRANSLATED_'
						}
						if (lng == 'sk') {
							return '_NEPRELOZENE_'
						}
						return '_NOT_TRANSLATED_'
					}
				}))
				.pipe(vfs.dest(i18nConfig.dest))
				.on('end', () => callback())
		})
	}

}

module.exports = ScannerWebpack
