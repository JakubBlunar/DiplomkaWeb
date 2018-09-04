import React from 'react'
import PropTypes from 'prop-types'

import AccountMenu from './partials/AccountMenu'
import CreateCharacterForm from '../components/CreateCharacterForm'

class CreateCharacterPage extends React.Component {
	static propTypes = {
		charactersActions: PropTypes.shape({
			loadCharacters: PropTypes.func.isRequired
		}).isRequired
	}

	render = () => {
		return (
			<div className="page-container account-index-page">
				<div className="container">
					<AccountMenu />
				</div>

				<div className="container">
					<div className="row characters-title">
						<h2>Create new character</h2>
					</div>

					<div className="row">
						<div className="col-lg-8">
							<CreateCharacterForm />
						</div>
					</div>

				</div>
			</div>
		)
	}

}

export default CreateCharacterPage
