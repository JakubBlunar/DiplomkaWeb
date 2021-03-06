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
import onlinePlayersReducer from './onlinePlayers'
import realmStatusReducer from './realmStatus'

export const REDUCER_KEYS = {
	FORM: 'form',
	AUTH: 'auth',
	CHARACTERS: 'characters',
	ONLINE_PLAYERS: 'onlinePlayers',
	REALM_STATUS: 'realmStatus'
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
	}, charactersReducer),
	onlinePlayers: persistReducer({
		key: REDUCER_KEYS.ONLINE_PLAYERS,
		storage: storageSession
	}, onlinePlayersReducer),
	realmStatus: persistReducer({
		key: REDUCER_KEYS.REALM_STATUS,
		storage: storageSession
	}, realmStatusReducer)
})

export default rootReducer
