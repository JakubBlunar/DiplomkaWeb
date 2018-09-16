import {
	toast
} from 'react-toastify'
import {
	getReq
} from '../utils/request'

import {
	REALM_STATUS_LOAD_DONE,
	REALM_STATUS_LOAD_START,
	REALM_STATUS_LOAD_FAIL
} from '../types/realmStatus'

function realmStatusLoadStart() {
	return {
		type: REALM_STATUS_LOAD_START
	}
}

function realmStatusLoadFail() {
	return {
		type: REALM_STATUS_LOAD_FAIL
	}
}

function realmStatusLoadSuccess(realmStatus) {
	return {
		type: REALM_STATUS_LOAD_DONE,
		payload: {
			realmStatus
		}
	}
}

export function loadRealmStatus() {
	return async (dispatch) => {
		dispatch(realmStatusLoadStart())

		try {
			const res = await getReq('/api/realm-status')
			dispatch(realmStatusLoadSuccess(res))
		} catch (e) {
			toast.error("Unable to load realm status")
			dispatch(realmStatusLoadFail())

		}
	}
}
