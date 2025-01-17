import classnames from 'classnames';
import React from 'react';

import './style.scss';

const FormRadio = ( { className, label, ...otherProps } ) => (
	<>
		<input { ...otherProps } type="radio" className={ classnames( className, 'form-radio' ) } />
		{ label != null && <span className="form-radio__label">{ label }</span> }
	</>
);

export default FormRadio;
