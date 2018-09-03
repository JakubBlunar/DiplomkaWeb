import {
	CHARACTERS_LOAD_START,
	CHARACTERS_LOAD_DONE,
	CHARACTERS_LOAD_FAIL,
} from '../types/characters'

const initState = {
	data: [],
	loading: false,
}

export default (state = initState, action) => {
	switch (action.type) {
		case CHARACTERS_LOAD_START:
			return {
				...state,
				loading: true
			}
		case CHARACTERS_LOAD_DONE:
			return {
				...state,
				loading: false,
				loggedIn: true,
				data: action.payload.characters
			}
		case CHARACTERS_LOAD_FAIL:
			return {
				...state,
				loggedIn: false,
				data: [],
				loading: false
			}
		default:
			return state
	}
}
