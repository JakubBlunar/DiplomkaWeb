import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_FAILURE,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT
} from '../types/auth'

const initState = {
	user: null,
	loading: false,
	loggedIn: false
}

export default (state = initState, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return {
				...state,
				loading: true
			}
		case USER_LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				loggedIn: true,
				user: action.payload.user
			}
		case USER_LOGIN_FAILURE:
			return {
				...state,
				loggedIn: false,
				user: null,
				loading: false
			}
		case USER_LOGOUT:
			return {
				...initState
			}
		default:
			return state
	}
}
