import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import * as AuthActions from '../../actions/auth'
import { ACCOUNT_INDEX, INDEX } from '../../utils/routes'

class AccountMenu extends React.Component {
	static propTypes = {
		authActions: PropTypes.shape({
			logoutUser: PropTypes.func.isRequired
		}).isRequired,
		auth: PropTypes.shape({
			user: PropTypes.shape({
				name: PropTypes.string,
				surname: PropTypes.string,
				login: PropTypes.string
			})
		}).isRequired

	}

	render = () => {
		const { name, surname, login } = this.props.auth.user

		let displayName = login
		if (name && surname) {
			displayName += ` (${name} ${surname})`
		}

		return (
			<div className="row menu">
				<div className="col-lg-12 intro">
					Logged as {displayName}
					<button onClick={() => this.props.authActions.logoutUser()} data-color="orange">
						Logout
					</button>
				</div>
				<div className="col-12 navigation">
					<Link to={INDEX}>
						<button data-color="orange">
							Home
						</button>
					</Link>

					<Link to={ACCOUNT_INDEX}>
						<button data-color="orange">
							Characters
						</button>
					</Link>

					<button data-color="orange">
						Settings
					</button>
				</div>
			</div>

		)
	}

}

const mapStateToProps = state => ({
	auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
	authActions: bindActionCreators(AuthActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu)
