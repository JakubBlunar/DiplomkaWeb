import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

const TextInputField = ({ input, label, placeholder, required, meta: { touched, error }, type = "text" }) => (
	<div className={cx('input-wrapper', { 'has-error': touched && error })}>
		<div className="group">
			<input {...input} placeholder={placeholder} type={type} required={required} className={cx({ 'not-empty': input.value ? true : false })} />
			<span className="bar"></span>
			<label htmlFor={label}>{label}</label>
			<div className="text-danger">
				{touched ? error : ''}
			</div>
		</div>

	</div>
)

TextInputField.propTypes = {
	placeholder: PropTypes.string,
	showLabel: PropTypes.bool,
	label: PropTypes.string,
	meta: PropTypes.shape({
		touched: PropTypes.bool.isRequired,
		error: PropTypes.string
	}).isRequired,
	input: PropTypes.shape({}).isRequired,
	required: PropTypes.bool,
	type: PropTypes.string
}

TextInputField.defaultProps = {
	showLabel: false,
	placeholder: '',
	label: '',
	required: false
}

export default TextInputField
