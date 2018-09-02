import {
	toast
} from 'react-toastify'

import {
	USER_LOGIN_SUCCESS
} from '../types/auth'

import {
	postReq
} from '../utils/request'

function userLoginSuccess(user) {
	return {
		type: USER_LOGIN_SUCCESS,
		payload: {
			user
		}
	}
}

export function registerUser(userData, callback) {
	return async (dispatch) => {
		try {
			const res = await postReq('/api/account/registration', {}, userData)
			console.log(res)

			dispatch(userLoginSuccess(res.account))
			if (callback) {
				callback(false, res)
			}
			return
		} catch (e) {
			console.log('ERROR', e)
			toast.error('We are sorry but something went wrong.')
			callback(true, null)
		}

	}
}
