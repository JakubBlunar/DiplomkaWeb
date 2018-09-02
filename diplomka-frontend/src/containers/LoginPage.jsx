import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { REGISTRATION } from '../utils/routes'

class LoginPage extends React.Component {

	render = () => {
		return (
			<div className="page-container login-page">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-2"></div>
						<div className="col-lg-6 col-md-8">
							<h1>Sign in</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-3 col-md-2"></div>
						<div className="col-lg-6 col-md-8">
							<LoginForm />
						</div>
					</div>
					<div className="row description">
						<div className="col-lg-3 col-md-2"></div>
						<div className="col-lg-6 col-md-8">
							Forgot your password? Click here. {'If you don\'t have your account yet, don\'t hesitate and sign-up'} <Link to={REGISTRATION}>here</Link>.
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default LoginPage
