import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { LOGIN } from '../../utils/routes'

class AuthRequiredRoute extends Route {
	static propTypes = {
		component: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.object
		]).isRequired,
		layout: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.object
		]),
	}

	render() {
		const { auth } = this.props
		if (!auth.user) {
			return <Redirect to={LOGIN} />
		}

		if (this.props.layout) {
			return (
				<React.Fragment>
					<this.props.layout {...this.props}>
						<this.props.component {...this.props} />
					</this.props.layout>
				</React.Fragment>
			)
		}

		return (
			<React.Fragment>
				<this.props.component {...this.props} />
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(AuthRequiredRoute)
