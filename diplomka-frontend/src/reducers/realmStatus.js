import {
	REALM_STATUS_LOAD_START,
	REALM_STATUS_LOAD_DONE,
	REALM_STATUS_LOAD_FAIL,
} from '../types/realmStatus'

const initState = {
	data: {
		realmName: "",
		startTime: "",
		endTime: "",
		onlineCount: 0,
		lightFactionOnline: 0,
		darkFactionOnline: 0,
		updatedAt: "",
		status: "unknown"
	},
	loading: false,
	lastLoad: new Date(-8640000000000000)
}

export default (state = initState, action) => {
	switch (action.type) {
		case REALM_STATUS_LOAD_START:
			return {
				...state,
				loading: true
			}
		case REALM_STATUS_LOAD_DONE:
			return {
				...state,
				loading: false,
				data: {
					...action.payload.realmStatus
				},
				lastLoad: new Date()
			}
		case REALM_STATUS_LOAD_FAIL:
			return {
				...state,
				loading: false
			}
		default:
			return state
	}
}
