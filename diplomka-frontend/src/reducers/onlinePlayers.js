import {
	ONLINE_PLAYERS_CHANGE_LIMIT_FAIL,
	ONLINE_PLAYERS_CHANGE_LIMIT_START,
	ONLINE_PLAYERS_LOAD_FAIL,
	ONLINE_PLAYERS_LOAD_DONE,
	ONLINE_PLAYERS_LOAD_START,
	ONLINE_PLAYERS_CHANGE_PAGE_FAIL,
	ONLINE_PLAYERS_CHANGE_PAGE_START
} from '../types/onlinePlayers'

const initState = {
	data: [],
	limit: 20,
	count: 0,
	page: 1,
	pages: 1,
	prevLimit: 20,
	prevPage: 1,
	loading: false
}

export default (state = initState, action) => {
	switch (action.type) {
		case ONLINE_PLAYERS_LOAD_START:
			return {
				...state,
				loading: true
			}
		case ONLINE_PLAYERS_LOAD_DONE:
			return {
				...state,
				loading: false,
				data: action.payload.onlinePlayers,
				limit: action.payload.limit,
				page: action.payload.page,
				pages: action.payload.pages,
				count: action.payload.count
			}
		case ONLINE_PLAYERS_LOAD_FAIL:
			return {
				...state,
				loading: false,
				page: state.prevPage,
				limit: state.prevLimit,
				search: state.prevSearch
			}
		case ONLINE_PLAYERS_CHANGE_LIMIT_START:
			return {
				...state,
				loading: true,
				prevPage: state.page,
				page: 1,
				prevLimit: state.limit,
				limit: action.payload.limit
			}
		case ONLINE_PLAYERS_CHANGE_LIMIT_FAIL:
			return {
				...state,
				loading: false,
				limit: state.prevLimit
			}
		case ONLINE_PLAYERS_CHANGE_PAGE_START:
			return {
				...state,
				loading: true,
				prevPage: state.page,
				page: action.payload.page
			}
		case ONLINE_PLAYERS_CHANGE_PAGE_FAIL:
			return {
				...state,
				loading: false,
				page: state.prevPage
			}
		default:
			return state
	}
}
