import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import TextInputField from '../../atoms/TextInputField'
import { capitalize } from 'lodash'
import { createCharacter } from '../../actions/character'

import { history } from '../../utils/history'
import validate from './validation'
import { ACCOUNT_INDEX } from '../../utils/routes'
import CharacterTypeSelect from '../../atoms/CharacterTypeSelect'

const normalizeName = (value) => {
	if (value) {
		return capitalize(value.replace(/[^a-zA-Z]/g, ""))
	}

	return value

}

class CreateCharacterForm extends React.Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		pristine: PropTypes.bool.isRequired,
		reset: PropTypes.func.isRequired,
		submitting: PropTypes.bool.isRequired,
		invalid: PropTypes.bool.isRequired,
		registrationActions: PropTypes.shape({
			registerUser: PropTypes.func.isRequired
		}).isRequired
	}

	state = {
		isLoading: false
	}

	onSubmit = async (values) => {
		console.log(values)

		this.setState({ isLoading: true }, () => {
			createCharacter(values, (err, character) => {
				this.setState({ isLoading: false }, () => {
					if (!err) {
						history.push(ACCOUNT_INDEX)
					}
				})
			})
		})

	}

	render = () => {
		const { handleSubmit, pristine, reset, submitting, invalid } = this.props
		const { isLoading } = this.state
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				{isLoading && <div className="loading style-2"><div className="loading-wheel"></div></div>}
				<Field
					name="name"
					component={TextInputField}
					label="Character name *"
					normalize={normalizeName}
				/>

				<Field
					name="type"
					component={CharacterTypeSelect}
					label="Character type *"
				/>

				<div>
					<div className="row">
						<div className="col-sm-6">
							<button className="full-width" type="submit" disabled={invalid || pristine || submitting} data-color="white">
								Submit
							</button>
						</div>
						<div className="col-sm-6">
							<button className="full-width" type="button" disabled={pristine || submitting} onClick={reset} data-color="white">
								Clear Values
							</button>
						</div>

					</div>

				</div>
			</form>
		)
	}

}

const form = reduxForm({
	form: 'createCharacter',
	validate: validate,
	initialValues: {
		type: 1
	}
})(CreateCharacterForm)

export default connect()(form)
