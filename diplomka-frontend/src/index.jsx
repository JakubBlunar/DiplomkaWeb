/* eslint-disable import/default */

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import configureStore from './store/configureStore'
import { history } from './utils/history'
import Root from './components/Root'
import { PersistGate } from 'redux-persist/es/integration/react'
import './styles/grid-min.css'
import './styles/global.less' //global css
require('./favicon.ico') //favicon for webpack
require('babel-polyfill')
import 'url-search-params-polyfill'

const { store, persistor } = configureStore()

render(
	<AppContainer>
		<PersistGate loading="Loading" persistor={persistor}>
			<Root store={store} history={history} />
		</PersistGate>
	</AppContainer>,
	document.getElementById('app')
)

if (module.hot) {
	module.hot.accept('./components/Root', () => {
		const NewRoot = require('./components/Root').default
		render(
			<AppContainer>
				<NewRoot store={store} history={history} />
			</AppContainer>,
			document.getElementById('app')
		)
	})
}
