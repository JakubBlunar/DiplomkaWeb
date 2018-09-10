import {
	toast
} from 'react-toastify'
import {
	postReq
} from '../utils/request'

export const requestPasswordRecovery = async (formData, callback) => {
	try {
		const res = await postReq('/api/password-recovery', {}, formData)
		if (callback) {
			callback(false, res)
		}
	} catch (e) {
		console.log('Error', e)
		toast.error("Unable to reset password.")
		if (callback) {
			callback(true, null)
		}
	}
}

export const recoveryPassword = async (formData, callback) => {
	try {
		const res = await postReq('/api/reset-password', {}, formData)
		toast.success("Your password has been succesfully changed.")
		if (callback) {
			callback(false, res)
		}
	} catch (e) {
		console.log('Error', e)
		toast.error("Unable to reset password.")
		if (callback) {
			callback(true, null)
		}
	}
}
