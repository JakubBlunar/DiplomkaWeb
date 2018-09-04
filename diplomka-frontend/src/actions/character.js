import {
	toast
} from 'react-toastify'
import {
	postReq
} from '../utils/request'

export const createCharacter = async (characterData, callback) => {
	try {
		const res = await postReq('/api/characters/create', {}, characterData)
		toast.success("Character was succesfuly created.")
		if (callback) {
			callback(false, res)
		}
	} catch (e) {
		console.log('Error', e)
		toast.error("Unable to create character")

		if (callback) {
			callback(true, null)
		}
	}
}
