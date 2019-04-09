import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import TextInputField from '../../atoms/TextInputField'

import * as AuthActions from '../../actions/auth'
import validate from './validation'
import Checkbox from '../../atoms/Checkbox'

class LoginForm extends React.Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		pristine: PropTypes.bool.isRequired,
		submitting: PropTypes.bool.isRequired,
		invalid: PropTypes.bool.isRequired,
		authActions: PropTypes.shape({
			logInUser: PropTypes.func.isRequired
		}).isRequired
	}

	state = {
		isLoading: false
	}

	onSubmit = values => {
		this.setState({ isLoading: true })
		this.props.authActions.logInUser(values, () => {
			this.setState({ isLoading: false })
		})
	}

	render = () => {
		const { handleSubmit, pristine, submitting, invalid } = this.props
		const { isLoading } = this.state
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<div className="row">
					<div className="col-12">
						{isLoading && (
							<div className="loading style-2">
								<div className="loading-wheel" />
							</div>
						)}
						<Field
							name="login"
							component={TextInputField}
							label="Login *"
						/>

						<Field
							name="password"
							component={TextInputField}
							label="Password *"
							type="password"
						/>

						<Checkbox name="remember" label="Remember login" />
					</div>
				</div>

				<div className="row">
					<div className="col-12">
						<button
							className="full-width"
							type="submit"
							disabled={
								isLoading || invalid || pristine || submitting
							}
							data-color="white"
						>
							Sign in
						</button>
					</div>
				</div>
			</form>
		)
	}
}

const form = reduxForm({
	form: 'login',
	validate: validate
})(LoginForm)

const mapDispatchToProps = dispatch => ({
	authActions: bindActionCreators(AuthActions, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(form)
