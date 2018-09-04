import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { map } from 'lodash'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import * as CharactersActions from '../actions/characters'
import AccountMenu from './partials/AccountMenu'
import { CHARACTER_CREATE } from '../utils/routes'

class AccountIndexPage extends React.Component {
	static propTypes = {
		charactersActions: PropTypes.shape({
			loadCharacters: PropTypes.func.isRequired
		}).isRequired,
		characters: PropTypes.shape({
			data: PropTypes.array.isRequired
		}).isRequired,
	}

	componentDidMount() {
		this.props.charactersActions.loadCharacters()
	}

	render = () => {
		const { data } = this.props.characters

		const characterBoxes = map(data, (character) => {

			return (
				<div className="col-lg-3" key={'character-box-' + character.id}>
					<div className="box">
						<h3>{character.name}</h3>
					</div>
				</div>
			)
		})

		return (
			<div className="page-container account-index-page">
				<div className="container">
					<AccountMenu />
				</div>

				<div className="container">
					<div className="row characters-title">
						<h2>Characters</h2>
					</div>

					<div className="row characters">
						{characterBoxes}
					</div>
					<div className="row characters-after">
						<Link to={CHARACTER_CREATE}>
							<button data-color="orange">
								Create new character
							</button>
						</Link>
					</div>
				</div>
			</div>
		)
	}

}

const mapStateToProps = state => ({
	characters: state.characters
})

const mapDispatchToProps = dispatch => ({
	charactersActions: bindActionCreators(CharactersActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountIndexPage)
