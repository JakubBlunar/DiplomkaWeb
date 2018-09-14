import React from 'react'
import { object, string } from 'prop-types'
import { Field } from 'redux-form/immutable'
import cx from 'classnames'

const Checkbox = ({
	label,
	input: { value, onChange, ...input },
	meta: { touched, error },
	...rest
}) => {
	return (
		<div className={cx('input-wrapper', { 'has-error': touched && error })}>
			<div className="group checkbox">
				<label>
					<p>
						<span>{label}</span>
			
						<input
							{...input}
							{...rest}
							defaultChecked={!!value}
							onChange={() => { onChange(!value) }}
							type="checkbox"
						/>
						<span className="checkmark"></span>
					</p>
				</label>
				<div className="text-danger">
					{touched ? error : ''}
				</div>
			</div>
		</div>
	)
}

Checkbox.propTypes = {
	input: object.isRequired,
	meta: object.isRequired,
	label: string
}

Checkbox.defaultProps = {
	input: null,
	meta: null
}

export default props => <Field {...props} component={Checkbox} />
