import { createStore, compose, applyMiddleware } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

import { persistStore } from 'redux-persist'

function loggerFilter(state, action) {
	if (action.type.startsWith('persist')) {
		return false
	}
	if (action.type == '@@redux-form/REGISTER_FIELD') {
		return false
	}
	if (action.type == '@@redux-form/UNREGISTER_FIELD') {
		return false
	}
	return true
}

function configureStoreProd(initialState) {
	const middlewares = [
		// Add other middleware on this line...

		thunk
	]

	const store = createStore(rootReducer, initialState, compose(
		applyMiddleware(...middlewares)
	))
	const persistor = persistStore(store)
	return { store, persistor }
}

function configureStoreDev(initialState) {
	const logger = createLogger({
		collapsed: true,
		duration: true,
		predicate: loggerFilter
	})

	const middlewares = [
		reduxImmutableStateInvariant(),
		// Add other middleware on this line...

		thunk,
		logger
	]

	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // add support for Redux dev tools
	const store = createStore(rootReducer, initialState, composeEnhancers(
		applyMiddleware(...middlewares)
	))
	const persistor = persistStore(store)

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers').default // eslint-disable-line global-require
			store.replaceReducer(nextReducer)
		})
	}

	return { store, persistor }
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev

export default configureStore
