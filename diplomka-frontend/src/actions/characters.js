import {
	toast
} from 'react-toastify'
import {
	getReq
} from '../utils/request'
import {
	get
} from 'lodash'

import {
	CHARACTERS_LOAD_DONE,
	CHARACTERS_LOAD_START,
	CHARACTERS_LOAD_FAIL
} from '../types/characters'

function charactersLoadStart() {
	return {
		type: CHARACTERS_LOAD_START
	}
}

function charactersLoadFail() {
	return {
		type: CHARACTERS_LOAD_FAIL
	}
}

function charactersLoadSuccess(characters) {
	return {
		type: CHARACTERS_LOAD_DONE,
		payload: {
			characters
		}
	}
}

export function loadCharacters(callback) {
	return async (dispatch, getStore) => {
		dispatch(charactersLoadStart())
		const {
			user
		} = getStore().auth

		const query = {
			accountId: get(user, 'id', null)
		}

		try {
			const res = await getReq('/api/characters', query)

			dispatch(charactersLoadSuccess(res.characters))
			if (callback) {
				callback(false, res)
			}
		} catch (e) {
			toast.error("Unable to load characters")
			dispatch(charactersLoadFail())

			if (callback) {
				callback(true, null)
			}
		}

	}
}
