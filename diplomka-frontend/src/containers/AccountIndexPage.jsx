import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { get, map } from 'lodash'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import * as CharactersActions from '../actions/characters'
import * as AuthActions from '../actions/auth'
import { ACCOUNT_INDEX, INDEX } from '../utils/routes'

class AccountIndexPage extends React.Component {
	static propTypes = {
		authActions: PropTypes.shape({
			logoutUser: PropTypes.func.isRequired
		}).isRequired,
		charactersActions: PropTypes.shape({
			loadCharacters: PropTypes.func.isRequired
		}).isRequired,
		characters: PropTypes.shape({
			data: PropTypes.array.isRequired
		}).isRequired,
		auth: PropTypes.shape({
			user: PropTypes.shape({
				name: PropTypes.string,
				surname: PropTypes.string,
				login: PropTypes.string
			})
		}).isRequired

	}

	componentDidMount() {
		this.props.charactersActions.loadCharacters()
	}

	render = () => {
		const { data } = this.props.characters
		const { name, surname, login } = this.props.auth.user

		const characterBoxes = map(data, (character) => {

			return (
				<div className="col-lg-3" key={'character-box-' + character.id}>
					<div className="box">
						<h3>{character.name}</h3>
					</div>
				</div>
			)
		})

		let displayName = login
		if (name && surname) {
			displayName += ` (${name} ${surname})`
		}

		return (
			<div className="page-container account-index-page">
				<div className="container">
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

					<div className="row characters-title">
						<h2>Characters</h2>
					</div>

					<div className="row characters">
						{characterBoxes}
					</div>

				</div>
			</div>
		)
	}

}

const mapStateToProps = state => ({
	auth: state.auth,
	characters: state.characters
})

const mapDispatchToProps = dispatch => ({
	authActions: bindActionCreators(AuthActions, dispatch),
	charactersActions: bindActionCreators(CharactersActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountIndexPage)
