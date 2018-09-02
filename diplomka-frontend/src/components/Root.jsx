import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import Routes from './Routes/Routes'

class Root extends Component {
	render = () => {
		const { store, history } = this.props
		return (
			<Provider store={store}>
				<Router history={history}>
					<Routes />
				</Router>
			</Provider>
		)
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
}

export default Root
