import {
	required,
	maxLength,
	minLength
} from '../../utils/validation'

const validate = values => {
	const errors = {}

	if (required(values.login)) {
		errors.login = 'Login is required'
	} else if (maxLength(10)(values.login)) {
		errors.login = 'Must be 10 characters or less'
	} else if (minLength(5)(values.login)) {
		errors.login = 'Must be 5 characters or more'
	}

	if (required(values.password)) {
		errors.password = 'Password is required'
	}

	return errors
}

export default validate
