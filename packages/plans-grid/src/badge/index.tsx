import classNames from 'classnames';
import * as React from 'react';

/**
 * Style dependencies
 */
import './style.scss';

// @TODO: move to '@automattic/components' and reuse in Gutenboarding

interface Props {
	children: React.ReactElement[];
	className?: string;
}

const Badge: React.FunctionComponent< Props > = ( { children, className, ...props } ) => (
	<span { ...props } className={ classNames( 'badge', className ) }>
		{ children }
	</span>
);

export default Badge;
