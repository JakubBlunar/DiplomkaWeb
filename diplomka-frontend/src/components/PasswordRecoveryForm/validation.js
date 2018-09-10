import {
	required,
	minLength
} from '../../utils/validation'

const validate = values => {
	const errors = {}

	if (required(values.newPassword)) {
		errors.newPassword = 'Password is required'
	} else if (minLength(5)(values.newPassword)) {
		errors.newPassword = 'Must be 5 characters or more'
	}

	if (values.newPassword !== values.repPassword) {
		errors.repPassword = 'Passwords does not match'
	}
	return errors
}

export default validate
