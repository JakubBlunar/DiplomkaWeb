import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { get } from 'lodash'
import * as AuthActions from '../actions/auth'

class AccountIndexPage extends React.Component {

	render = () => {
		return (
			<div className="page-container">
				<div className="container">
					<div className="row">
						<div className="col-lg-3"></div>
						<div className="col-lg-6 intro">
							Logged as {get(this.props, 'auth.user.name', '-')}
						</div>
					</div>
					<div className="row join">
						<button onClick={() => this.props.authActions.logoutUser()}>
							Logout
						</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountIndexPage)
