import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
	TransitionGroup,
	CSSTransition
} from 'react-transition-group'

import AuthRequiredRoute from './AuthRequiredRoute'
import {
	LOGIN,
	INDEX,
	REGISTRATION,
	ACCOUNT_INDEX,
	REGISTRATION_COMPLETE
} from '../../utils/routes'
import { has } from 'lodash'

import IndexPage from '../../containers/IndexPage'
import RegistrationPage from '../../containers/RegistrationPage'
import LoginPage from '../../containers/LoginPage'
import Menu from '../Menu'
import AccountIndexPage from '../../containers/AccountIndexPage'
import * as AuthActions from '../../actions/auth'
import RegistrationCompletePage from '../../containers/RegistrationCompletePage'

class Routes extends Component {
	static propTypes = {
		location: PropTypes.shape({
			pathname: PropTypes.any
		}).isRequired,
		authActions: PropTypes.shape({
			logoutUser: PropTypes.func.isRequired
		}).isRequired
	}

	state = {
		showMenu: false,
		menuFromTop: true,
		inited: false
	}

	constructor(props) {
		super(props)

		axios.interceptors.response.use(
			response => response,
			this.reponseErrorHandler
		)
	}

	// axios global response error handler
	reponseErrorHandler = error => {
		if (has(error, 'response') && error && error.response) {
			const stack = {
				url: error.response.request.responseURL,
				status: error.response.status,
				data: error.response.data,
				header: error.response.headers,
				msg: error.response.statusText
			}
			console.log('Error', stack)
		}

		if (has(error, 'status') && error.status === 401) {
			this.props.authActions.logoutUser()
		}

		if (has(error, 'response.status') && error && error.response) {
			// on 401 http error code do not show status tool tip bar only log out user
			switch (error.response.status) {
				case 401:
					this.props.authActions.logoutUser()
					break
			}
		}

		// Do something with response error
		return Promise.reject(error)
	}

	componentDidMount() {
		this.setState({
			inited: true
		})
	}

	setMenuVisibility = (visibility) => {
		const newState = {
			...this.state,
			showMenu: visibility
		}

		if (visibility) {
			newState.menuFromTop = Math.random() < 0.5
		}
		this.setState(newState)
	}

	render() {
		const { menuFromTop, inited, showMenu } = this.state
		return (
			<div className="layout-container">
				<Menu
					setMenuVisibility={this.setMenuVisibility}
					menuFromTop={menuFromTop}
					visible={showMenu}
				/>
				<TransitionGroup className="page-wrapper">
					<CSSTransition
						key={this.props.location.pathname}
						timeout={350}
						classNames={inited ? (menuFromTop ? 'background-from-bottom' : 'background') : ''}
					>
						<Switch location={this.props.location}>
							<Route exact path={INDEX} component={IndexPage} />
							<Route exact path={REGISTRATION} component={RegistrationPage} />
							<Route exact path={LOGIN} component={LoginPage} />
							<AuthRequiredRoute exact path={REGISTRATION_COMPLETE} component={RegistrationCompletePage} />
							<AuthRequiredRoute exact path={ACCOUNT_INDEX} component={AccountIndexPage} />
							<Route render={() => <div>Not Found</div>} />
						</Switch>
					</CSSTransition>
				</TransitionGroup>

				<ToastContainer
					position="top-right"
					autoClose={10000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnVisibilityChange
					draggable
					pauseOnHover
				/>
			</div>

		)

	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

const mapDispatchToProps = dispatch => ({
	dispatch,
	authActions: bindActionCreators(AuthActions, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))
