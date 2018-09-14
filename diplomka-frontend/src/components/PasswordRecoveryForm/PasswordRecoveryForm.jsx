import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import TextInputField from '../../atoms/TextInputField'
import * as AccountActions from '../../actions/account'
import validate from './validation'
import { history } from '../../utils/history'
import { LOGIN } from '../../utils/routes'

class PasswordRecoveryForm extends React.Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		pristine: PropTypes.bool.isRequired,
		submitting: PropTypes.bool.isRequired,
		invalid: PropTypes.bool.isRequired,
		accountActions: PropTypes.shape({
			recoveryPassword: PropTypes.func.isRequired
		}).isRequired,
		location: PropTypes.shape({
			search: PropTypes.string.isRequired
		}).isRequired
	}

	state = {
		isLoading: false
	}

	componentDidMount() {
		const { token } = queryString.parse(this.props.location.search)
		if (!token) {
			history.push(LOGIN)
		}
	}

	onSubmit = (values) => {
		console.log(values)
		const { token } = queryString.parse(this.props.location.search)

		this.setState({ isLoading: true })
		AccountActions.recoveryPassword({ ...values, token }, (err) => {
			this.setState({ isLoading: false }, () => {
				if (!err) {
					history.push(LOGIN)
				}
			})

		})
	}

	render = () => {
		const { handleSubmit, pristine, submitting, invalid } = this.props
		const { isLoading } = this.state
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<div className="row">
					<div className="col-12">
						{isLoading && <div className="loading style-2"><div className="loading-wheel"></div></div>}
						<Field
							name="newPassword"
							component={TextInputField}
							label="New password *"
							type="password"
						/>

						<Field
							name="repPassword"
							component={TextInputField}
							label="Repeat password *"
							type="password"
						/>
					</div>

				</div>

				<div className="row">
					<div className="col-12">
						<button className="full-width" type="submit" disabled={isLoading || invalid || pristine || submitting} data-color="white">
							Change password
						</button>
					</div>
				</div>

			</form>
		)
	}

}

const form = reduxForm({
	form: 'passwordRecovery',
	validate: validate
})(PasswordRecoveryForm)

const mapStateToProps = state => ({
	auth: state.auth
})

export default withRouter(connect(mapStateToProps)(form))
