import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import Routes from './Routes/Routes'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n.js'

class Root extends Component {
	render = () => {
		const { store, history } = this.props
		return (
			<Provider store={store}>
				<I18nextProvider i18n={i18n}>
					<Router history={history}>
						<Routes />
					</Router>
				</I18nextProvider>
			</Provider>
		)
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
}

export default Root
