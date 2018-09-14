import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import TextInputField from '../../atoms/TextInputField'

import * as AccountActions from '../../actions/account'
import validate from './validation'

class ForgotPasswordForm extends React.Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		pristine: PropTypes.bool.isRequired,
		submitting: PropTypes.bool.isRequired,
		invalid: PropTypes.bool.isRequired,
		accountActions: PropTypes.shape({
			requestPasswordRecovery: PropTypes.func.isRequired
		}).isRequired
	}

	state = {
		isLoading: false,
		done: false
	}

	onSubmit = (values) => {
		console.log(values)
		this.setState({ isLoading: true })
		AccountActions.requestPasswordRecovery(values, (err) => {
			if (err) {
				return this.setState({ isLoading: false, done: false })
			}
			this.setState({ isLoading: false, done: true })
		})
	}

	render = () => {
		const { handleSubmit, pristine, submitting, invalid } = this.props
		const { isLoading, done } = this.state

		if (done) {
			return (
				<div style={{ color: 'white' }}>
					Your application for password recovery has been succesfully processed. We sent you an e-mail with instructions for reseting your password. Please check your e-mails.
				</div>
			)
		}

		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<div className="row">
					<div className="col-12">
						{isLoading && <div className="loading style-2"><div className="loading-wheel"></div></div>}
						<Field
							name="email"
							component={TextInputField}
							label="Email *"
						/>
					</div>

				</div>

				<div className="row">
					<div className="col-12">
						<button className="full-width" type="submit" disabled={isLoading || invalid || pristine || submitting} data-color="white">
							Recover password
						</button>
					</div>
				</div>

			</form>
		)
	}

}

const form = reduxForm({
	form: 'forgotPassword',
	validate: validate
})(ForgotPasswordForm)

export default connect(null)(form)
