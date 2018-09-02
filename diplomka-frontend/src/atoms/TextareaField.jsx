import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

const TextareaField = ({ input, label, placeholder, required, showLabel, meta: { touched, error }, rows })=> (
	<div className="input-wrapper">
		<div className={cx('input-field', { 'has-error': touched && error  })}>
			{showLabel && <label htmlFor={label}>{label}</label>}
			<textarea {...input} placeholder={placeholder} type="text" className={cx('form-control', 'input-field')} required={required} rows={rows}></textarea>
			<div className="text-danger">
				{touched ? error : ''}
			</div>
		</div>
	</div>
)

TextareaField.propTypes = {
	placeholder: PropTypes.string,
	showLabel: PropTypes.bool,
	label: PropTypes.string,
	meta: PropTypes.shape({
		touched: PropTypes.bool.isRequired,
		error: PropTypes.string
	}).isRequired,
	input: PropTypes.shape({}).isRequired,
	required: PropTypes.bool,
	rows: PropTypes.string
}

TextareaField.defaultProps = {
	showLabel: false,
	placeholder: '',
	label: '',
	required: false,
	rows: '3'
}

export default TextareaField
