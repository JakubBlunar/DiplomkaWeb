import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import cx from 'classnames'
//import menuIcon from '../resources/img/menu.svg'
import menuIconWhite from '../resources/img/menu-white.svg'

import { INDEX, REGISTRATION, LOGIN } from '../utils/routes'

class Menu extends Component {
	static propTypes = {
		setMenuVisibility: PropTypes.func.isRequired,
		menuFromTop: PropTypes.bool.isRequired,
		visible: PropTypes.bool.isRequired
	}

	render = () => {

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

									<li>
										<Link to={REGISTRATION} onClick={() => this.props.setMenuVisibility(false)}>
											<button className="full-width" data-color="orange">
												Sign up
											</button>
										</Link>
									</li>

									<li>
										<Link to={LOGIN} onClick={() => this.props.setMenuVisibility(false)}>
											<button className="full-width" data-color="orange">
												Sign in
											</button>
										</Link>
									</li>
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

export default Menu
