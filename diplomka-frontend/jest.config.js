module.exports = {
	"moduleNameMapper": {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tools/assetsTransformer.js",
		"\\.(css)$": "<rootDir>/tools/assetsTransformer.js"
	},
	"setupFiles": [
		"raf/polyfill",
		"./tools/enzymeTestAdapterSetup.js",
		"jest-localstorage-mock"
	],
	"snapshotSerializers": [
		"enzyme-to-json/serializer"
	],
	"testURL" : 'http://localhost',
	"globals": {
		nonExpiredToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJaU0UiLCJpYXQiOjE1Mjc4NDYyMDQsImV4cCI6NDcxNTA1NTgwNCwiYXVkIjoienNlIiwic3ViIjoiam9obi5kb2VAZXhhbXBsZS5jb20ifQ.dNomR3WZwrC4bdX2UoLlcMhPhvvg5t0f_DwNYseprKw',
		expiredToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJaU0UiLCJpYXQiOjE1Mjc4NDYyMDQsImV4cCI6MTQ2NDc3NDIwNCwiYXVkIjoienNlIiwic3ViIjoiam9obi5kb2VAZXhhbXBsZS5jb20ifQ.hSVmb8okjEEfc61D1plaHr6NrB6ue8AzTcl3PmYGHRQ',
		tokenWithUndefinedExpiration: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJaU0UiLCJzdWIiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsIm5iZiI6MTUyNzg1Mzg4OCwiaWF0IjoxNTI3ODUzODg4fQ.CcGRd1PiOaV8ApiFxpc4dLpDDjgLCAIa41jy2WAjBbs'
	}
}
