import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import { REGISTRATION, LOGIN, ACCOUNT_INDEX } from '../utils/routes'

class IndexComponent extends React.Component {
	static propTypes = {
		auth: PropTypes.shape({
			user: PropTypes.shape()
		}).isRequired,
		t: PropTypes.func.isRequired
	}

	render = () => {
		const { user } = this.props.auth
		const { t } = this.props

		return (
			<div className="page-container index-page">
				<div className="container">
					<div className="row">
						<div className="col-lg-3"></div>
						<div className="col-lg-6 intro">
							<p>
								{t('index:welcome')}
							</p>
							<p>
								{t('index:to')}
							</p>
							<h1>Akalitasia</h1>
						</div>
					</div>
					{!user && <div className="row join">
						<div className="col-lg-5">
							<Link to={REGISTRATION}>
								<button className="full-width" data-color="white">
									{t('translation:Sign up')}
								</button>
							</Link>
						</div>
						<div className="col-lg-2 middle-col">
							{t('index:or')}
						</div>
						<div className="col-lg-5">
							<Link to={LOGIN}>
								<button className="full-width" data-color="white">
									{t('translation:Sign in')}
								</button>
							</Link>
						</div>
					</div>}

					{user && <div className="row join">
						<div className="col-lg-4">

						</div>
						<div className="col-lg-4">
							<Link to={ACCOUNT_INDEX}>
								<button className="full-width" data-color="white">
									{t('index:My Account')}
								</button>
							</Link>
						</div>
					</div>}

				</div>
			</div>
		)
	}

}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(translate('index')(IndexComponent))
