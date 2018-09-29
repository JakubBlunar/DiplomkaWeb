import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import XHR from 'i18next-xhr-backend'

const backendOpts = {
	loadPath: `assets/locales/{{lng}}/{{ns}}.json`
}

i18n.use(XHR).use(LanguageDetector).init({
	debug: true,
	interpolation: {
		escapeValue: false
	},
	lng: 'en' | 'sk',
	load: 'languageOnly',
	fallbackLng: 'en',
	backend: backendOpts,
	defaultNS: 'translation'
})

export default i18n
