import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { find } from 'lodash'
import locale from '../resources/locale'

class SelectField extends React.Component {

	handleChangeSimple = (option) => {
		const val = option ? option.value : null
		this.props.input.onChange(val)
	}

	handleChangeMultiple = (val) => {
		const values = val || []
		this.props.input.onChange(values)
	}

	render = () => {
		const { input: { value }, ...props } = this.props

		let val = (value !== undefined) ? value : null
		let handleChange = this.handleChangeSimple

		if (props.isMulti) {
			handleChange = this.handleChangeMultiple
			if (!val) {
				val = []
			}
		} else {
			val = find(props.options, function(o) { return o.value == val })
		}

		return (
			<div className="select-wrapper">
				<Select
					{...props}
					value={val || null}
					onChange={e => handleChange(e)}		
					noOptionsMessage={() => 'Nič sa nenašlo.'}
					placeholder={props.placeholder || locale['general.select.placeholder']}
				/>
			</div>
		)
	}
}

SelectField.propTypes = {
	input: PropTypes.shape({
		value: PropTypes.any,
		onChange: PropTypes.func.isRequired,
	}).isRequired
}

SelectField.defaultProps = {
	input: {
		value: null,
	}
}

export default SelectField
