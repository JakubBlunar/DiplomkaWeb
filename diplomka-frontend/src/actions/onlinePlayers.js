import {
	toast
} from 'react-toastify'
import {
	getReq
} from '../utils/request'

import {
	ONLINE_PLAYERS_LOAD_DONE,
	ONLINE_PLAYERS_LOAD_FAIL,
	ONLINE_PLAYERS_LOAD_START,
	ONLINE_PLAYERS_CHANGE_LIMIT_FAIL,
	ONLINE_PLAYERS_CHANGE_LIMIT_START,
	ONLINE_PLAYERS_CHANGE_PAGE_FAIL,
	ONLINE_PLAYERS_CHANGE_PAGE_START
} from '../types/onlinePlayers'

function onlinePlayersLoadStart() {
	return {
		type: ONLINE_PLAYERS_LOAD_START
	}
}

function onlinePlayersLoadFail() {
	return {
		type: ONLINE_PLAYERS_LOAD_FAIL
	}
}

function onlinePlayersLoadSuccess(onlinePlayers, page, limit, count, pages) {
	return {
		type: ONLINE_PLAYERS_LOAD_DONE,
		payload: {
			onlinePlayers,
			page,
			limit,
			count,
			pages
		}
	}
}

function changePageStart(page) {
	return {
		type: ONLINE_PLAYERS_CHANGE_PAGE_START,
		payload: {
			page
		}
	}
}

function changePageFail() {
	return {
		type: ONLINE_PLAYERS_CHANGE_PAGE_FAIL
	}
}

function changeLimitStart(limit) {
	return {
		type: ONLINE_PLAYERS_CHANGE_LIMIT_START,
		payload: {
			limit
		}
	}
}

function changeLimitFail() {
	return {
		type: ONLINE_PLAYERS_CHANGE_LIMIT_FAIL
	}
}

const getOnlinePlayers = async (dispatch, getStore, fail) => {
	const {
		limit,
		page
	} = getStore().onlinePlayers

	const query = {
		page,
		limit
	}

	try {
		const res = await getReq('/api/online-players', query)
		dispatch(onlinePlayersLoadSuccess(res.onlinePlayers, res.page, res.limit, res.count, res.pages))
	} catch (e) {
		toast.error("Unable to load online players")
		dispatch(fail())
	}
}

export function loadOnlinePlayers() {
	return (dispatch, getStore) => {
		dispatch(onlinePlayersLoadStart())
		getOnlinePlayers(dispatch, getStore, onlinePlayersLoadFail)
	}
}

export function onlinePlayersChangeLimit(limit) {
	return (dispatch, getStore) => {
		dispatch(changeLimitStart(limit))
		getOnlinePlayers(dispatch, getStore, changeLimitFail)
	}
}

export function onlinePlayersChangePage(page) {
	return (dispatch, getStore) => {
		dispatch(changePageStart(page))
		getOnlinePlayers(dispatch, getStore, changePageFail)
	}
}
