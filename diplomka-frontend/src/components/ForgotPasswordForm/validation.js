import {
	required,
	email
} from '../../utils/validation'

const validate = values => {
	const errors = {}

	if (required(values.email)) {
		errors.email = 'Email is required'
	} else if (email(values.email)) {
		errors.email = 'Must be valid email.'
	}

	return errors
}

export default validate
