import classnames from 'classnames';
import React from 'react';

import './style.scss';

const FormSectionHeading = ( { className, children, ...otherProps } ) => (
	<h3 { ...otherProps } className={ classnames( className, 'form-section-heading' ) }>
		{ children }
	</h3>
);

export default FormSectionHeading;
