import {
	required,
	email,
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

	if (!values.email) {
		errors.email = 'Email is required'
	} else if (email(values.email)) {
		errors.email = 'Invalid email address'
	}

	if (required(values.name)) {
		errors.name = 'First name is required'
	}
	if (required(values.surname)) {
		errors.surname = 'Last name is required'
	}

	if (required(values.password)) {
		errors.password = 'Password is required'
	} else if (minLength(5)(values.password)) {
		errors.password = 'Must be 5 characters or more'
	}

	if (values.password !== values.passwordRepeat) {
		errors.passwordRepeat = 'Passwords does not match'
	}

	return errors
}

export default validate
