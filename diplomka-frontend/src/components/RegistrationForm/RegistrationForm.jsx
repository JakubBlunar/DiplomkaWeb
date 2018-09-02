import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import TextInputField from '../../atoms/TextInputField'

import * as RegistrationActions from '../../actions/registration'
import { history } from '../../utils/history'
import validate from './validation'
import { REGISTRATION_COMPLETE } from '../../utils/routes'

class RegistrationForm extends React.Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		pristine: PropTypes.bool.isRequired,
		reset: PropTypes.func.isRequired,
		submitting: PropTypes.bool.isRequired,
		invalid: PropTypes.bool.isRequired,
		registrationActions: PropTypes.shape({
			registerUser: PropTypes.func.isRequired
		}).isRequired
	}

	state = {
		isLoading: false
	}

	onSubmit = async (values) => {
		this.setState({ isLoading: true })
		console.log(values)
		this.props.registrationActions.registerUser(values, (err, account) => {
			this.setState({ isLoading: false }, () => {
				if (!err) {
					history.push(REGISTRATION_COMPLETE)
				}

			})
		})

	}

	render = () => {
		const { handleSubmit, pristine, reset, submitting, invalid } = this.props
		const { isLoading } = this.state
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				{isLoading && <div className="loading style-2"><div className="loading-wheel"></div></div>}
				<Field
					name="login"
					component={TextInputField}
					label="Login *"
				/>
				<Field
					name="email"
					component={TextInputField}
					label="Email *"
				/>

				<Field
					name="name"
					component={TextInputField}
					label="First name *"
				/>

				<Field
					name="surname"
					component={TextInputField}
					label="Last name *"
				/>

				<Field
					name="password"
					component={TextInputField}
					label="Password *"
					type="password"
				/>

				<Field
					name="passwordRepeat"
					component={TextInputField}
					label="Password repeat *"
					type="password"
				/>

				<div>
					<div className="row">
						<div className="col-sm-6">
							<button className="full-width" type="submit" disabled={invalid || pristine || submitting} data-color="white">
								Submit
							</button>
						</div>
						<div className="col-sm-6">
							<button className="full-width" type="button" disabled={pristine || submitting} onClick={reset} data-color="white">
								Clear Values
							</button>
						</div>

					</div>

				</div>
			</form>
		)
	}

}

const form = reduxForm({
	form: 'registration',
	validate: validate
})(RegistrationForm)

const mapDispatchToProps = dispatch => ({
	registrationActions: bindActionCreators(RegistrationActions, dispatch)
})

export default connect(null, mapDispatchToProps)(form)
