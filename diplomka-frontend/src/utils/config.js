const production = {
	baseUrl: '',
	loginUrl: ''
}

const development = {
	baseUrl: '',
	loginUrl: '',
	cacheTime: 0
}

let config = {
	searchUserLimit: 10,
	zmluvneUctyPageSize: 10,
	cacheTime: 5, // 5 minutes
	fakturyPageSize: 20
}

switch (process.env.NODE_ENV) {
	case 'production':
		config = {
			...config,
			...production
		}
		break
	case 'development':
		config = {
			...config,
			...development
		}
		break
}

export default config
