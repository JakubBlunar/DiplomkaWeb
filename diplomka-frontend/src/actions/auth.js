import {
	toast
} from 'react-toastify'
import {
	history
} from '../utils/history'
import {
	postReq
} from '../utils/request'

import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	USER_LOGOUT
} from '../types/auth'
import {
	ACCOUNT_INDEX
} from '../utils/routes'

function userLoginRequest() {
	return {
		type: USER_LOGIN_REQUEST
	}
}

function userLoginFailure() {
	return {
		type: USER_LOGIN_FAILURE
	}
}

function userLoginSuccess(user) {
	return {
		type: USER_LOGIN_SUCCESS,
		payload: {
			user
		}
	}
}

function logout() {
	return {
		type: USER_LOGOUT
	}
}

export function logoutUser() {
	return (dispatch) => {
		dispatch(logout())
	}
}

export function logInUser(userLoginData, callback) {
	return async (dispatch) => {
		dispatch(userLoginRequest())
		try {
			const res = await postReq('/api/account/login', null, userLoginData)

			dispatch(userLoginSuccess(res.account))
			history.push(ACCOUNT_INDEX)
		} catch (e) {
			toast.error("Unable to login")
			dispatch(userLoginFailure())
			if (callback) {
				callback(true, null)
			}
		}

	}
}
