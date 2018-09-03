import {
	persistReducer
} from 'redux-persist'
import {
	combineReducers
} from 'redux'
import storageLocal from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session'
import {
	reducer as formReducer
} from 'redux-form'

import authReducer from './auth'
import charactersReducer from './characters'

export const REDUCER_KEYS = {
	FORM: 'form',
	AUTH: 'auth',
	CHARACTERS: 'characters'
}

const rootReducer = combineReducers({
	form: persistReducer({
		key: REDUCER_KEYS.FORM,
		storage: storageSession
	}, formReducer),
	auth: persistReducer({
		key: REDUCER_KEYS.AUTH,
		storage: storageLocal
	}, authReducer),
	characters: persistReducer({
		key: REDUCER_KEYS.CHARACTERS,
		storage: storageSession
	}, charactersReducer)
})

export default rootReducer
