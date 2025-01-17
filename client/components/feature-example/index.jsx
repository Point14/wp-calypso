import React from 'react';

import './style.scss';

export default function FeatureExample( { children } ) {
	return (
		<div className="feature-example">
			<div className="feature-example__content">{ children }</div>
			<div className="feature-example__gradient" />
		</div>
	);
}
