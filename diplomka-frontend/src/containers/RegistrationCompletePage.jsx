import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { get } from 'lodash'
import * as AuthActions from '../actions/auth'
import { ACCOUNT_INDEX } from '../utils/routes';

class RegistrationCompletePage extends React.Component {

	render = () => {
		return (
			<div className="page-container">
				<div className="container">
					<div className="row">
						<div className="col-lg-3"></div>
						<div className="col-lg-6 intro">
							<h2>Welcome {get(this.props, 'auth.user.name', '-')} !</h2>

							Your registration was successfull...
						</div>
					</div>
					<div className="row join">
						<div className="col-lg-3"></div>
						<div className="col-lg-6 intro">
							<Link to={ACCOUNT_INDEX}>
								<button className="full-width" data-color="white">
									To your profile
								</button>
							</Link>
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

const mapDispatchToProps = dispatch => ({
	authActions: bindActionCreators(AuthActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationCompletePage)
