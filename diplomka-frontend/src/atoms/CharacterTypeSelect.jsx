import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { find } from 'lodash'
import cx from 'classnames'

const options = [{
	value: 1,
	label: 'Human male',
	image: '/asd/qwe.png'
}, {
	value: 2,
	label: 'Human female',
	image: '/asd/qwe.png'
}]

const CustomOption = (props) => {
	if (props.isDisabled)
		return null

	return (
		<div {...props.innerProps} className={
			cx('row', 'character-select-option', {
				'selected': props.isSelected,
				'focused': !props.isSelected && props.isFocused ? true : false
			})}
		>
			<div className="col-12">
				{props.data.label}
			</div>
		</div>

	)
}

const customStyles = {
	option: (base, state) => {
		return ({
			...base,
			borderBottom: '1px dotted pink',
			color: state.isFullscreen ? 'red' : 'blue',
			padding: 20,
		})
	},
	singleValue: (base, state) => {
		const opacity = state.isDisabled ? 0.5 : 1
		const transition = 'opacity 300ms'

		return { ...base, opacity, transition }
	},
	control: (base, state) => {
		return ({
			...base,
			boxShadow: state.isFocused ? "0 0 0 1px rgb(194,91,86)" : 'none',
			borderColor: state.isFocused ? 'rgb(194,91,86)' : 'white',
			'&:hover': {
				borderColor: 'rgb(194,91,86)'
			}
		})
	},
}

class CharacterTypeSelect extends React.Component {
	handleChange = (option) => {
		const val = option ? option.value : 1
		this.props.input.onChange(val)
	}

	render = () => {
		const { input: { value }, label, placeholder, meta: { touched, error }, ...props } = this.props

		let val = (value !== undefined) ? value : null
		val = find(options, function (o) { return o.value == val })

		return (
			<div className={cx('input-wrapper', 'select-wrapper', { 'has-error': touched && error })}>
				<label htmlFor={label}>{label}</label>
				<Select
					{...props}
					options={options}
					value={val || 1}
					isClearable={false}
					onChange={e => this.handleChange(e)}
					classNamePrefix='react-select'
					styles={customStyles}
					placeholder={placeholder}
					components={{ Option: CustomOption }}
				/>

				<div className="text-danger">
					{touched ? error : ''}
				</div>

			</div>
		)
	}
}

CharacterTypeSelect.propTypes = {
	input: PropTypes.shape({
		value: PropTypes.any,
		onChange: PropTypes.func.isRequired,
	}).isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	meta: PropTypes.shape({
		touched: PropTypes.bool,
		error: PropTypes.bool
	}).isRequired
}

CharacterTypeSelect.defaultProps = {
	input: {
		value: 1,
	}
}

export default CharacterTypeSelect
