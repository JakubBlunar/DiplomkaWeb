import React from 'react'
import { Link } from 'react-router-dom'
import RegistrationForm from '../components/RegistrationForm'
import { LOGIN } from '../utils/routes'

class RegistrationPage extends React.Component {

	render = () => {
		return (
			<div className="page-container registration-page">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-2"></div>
						<div className="col-lg-6 col-md-8">
							<h1>Sign up</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-3 col-md-2"></div>
						<div className="col-lg-6 col-md-8">
							<RegistrationForm />
						</div>
					</div>
					<div className="row description">
						<div className="col-lg-3 col-md-2"></div>
						<div className="col-lg-6 col-md-8">
							Already have an account? <Link to={LOGIN}>Click here</Link>.
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default RegistrationPage
