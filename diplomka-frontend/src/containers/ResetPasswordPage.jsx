import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { LOGIN, ACCOUNT_INDEX } from '../utils/routes'
import PropTypes from 'prop-types'

import PasswordRecoveryForm from '../components/PasswordRecoveryForm'

class ResetPasswordPage extends React.Component {
	static propTypes = {
		auth: PropTypes.shape().isRequired
	}
	render = () => {
		if (this.props.auth.user) {
			return <Redirect to={ACCOUNT_INDEX} />
		}
		return (
			<div className="page-container login-page">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-2"></div>
						<div className="col-lg-6 col-md-8">
							<h1>Reset password</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-3 col-md-2"></div>
						<div className="col-lg-6 col-md-8">
							<PasswordRecoveryForm />
						</div>
					</div>
					<div className="row description">
						<div className="col-lg-3 col-md-2"></div>
						<div className="col-lg-6 col-md-8">
							Want to sign-in? Click <Link to={LOGIN}>here</Link>.
						</div>
					</div>
				</div>
			</div>
		)
	}

}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(ResetPasswordPage)
