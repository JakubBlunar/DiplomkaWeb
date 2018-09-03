import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import cx from 'classnames'
//import menuIcon from '../resources/img/menu.svg'
import menuIconWhite from '../resources/img/menu-white.svg'

import * as AuthActions from '../actions/auth'
import { INDEX, REGISTRATION, LOGIN, ACCOUNT_INDEX } from '../utils/routes'

class Menu extends Component {
	static propTypes = {
		setMenuVisibility: PropTypes.func.isRequired,
		menuFromTop: PropTypes.bool.isRequired,
		visible: PropTypes.bool.isRequired,
		auth: PropTypes.shape({
			user: PropTypes.shape()
		}).isRequired
	}

	render = () => {
		const { user } = this.props.auth

		return (
			<React.Fragment>
				<div className={cx("overlay", this.props.menuFromTop ? 'from-top' : 'from-left', { 'active': this.props.visible })}>
					<button className="closebtn" onClick={() => this.props.setMenuVisibility(false)}>&times;</button>

					<div className="overlay-content">
						<div className="row">
							<div className="col-lg-3"></div>
							<div className="col-lg-6 menu-list">
								<ul>
									<li>
										<Link to={INDEX} onClick={() => this.props.setMenuVisibility(false)}>
											<button className="full-width" data-color="orange">
												Home
											</button>
										</Link>
									</li>

									{user && <li>
										<Link to={ACCOUNT_INDEX} onClick={() => this.props.setMenuVisibility(false)}>
											<button className="full-width" data-color="orange">
												My Account
											</button>
										</Link>
									</li>}

									{!user && <li>
										<Link to={REGISTRATION} onClick={() => this.props.setMenuVisibility(false)}>
											<button className="full-width" data-color="orange">
												Sign up
											</button>
										</Link>
									</li>}

									{!user && <li>
										<Link to={LOGIN} onClick={() => this.props.setMenuVisibility(false)}>
											<button className="full-width" data-color="orange">
												Sign in
											</button>
										</Link>
									</li>}

								</ul>
							</div>
						</div>

					</div>
				</div>

				{!this.props.visible && <div className="open-menu" onClick={() => this.props.setMenuVisibility(true)}>
					<img src={menuIconWhite} width={100} height={100} />
				</div>}
			</React.Fragment>

		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

const mapDispatchToProps = dispatch => ({
	authActions: bindActionCreators(AuthActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
