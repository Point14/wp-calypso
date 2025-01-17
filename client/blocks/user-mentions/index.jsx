import PropTypes from 'prop-types';
import React from 'react';
import addUserMentions from './add';
import connectUserMentions from './connect';

/**
 * withUserMentions is a higher-order component that adds connected user mention support to whatever input it wraps.
 *
 * @example: withUserMentions( Component )
 *
 * @param {object} WrappedComponent - React component to wrap
 * @returns {object} the enhanced component
 */
const withUserMentions = ( WrappedComponent ) => {
	class TextInputWrapper extends React.PureComponent {
		static propTypes = {
			siteId: PropTypes.number,
		};

		render() {
			return <WrappedComponent { ...this.props } ref={ this.props.forwardedRef } />;
		}
	}

	return connectUserMentions(
		addUserMentions(
			React.forwardRef( ( props, ref ) => {
				return <TextInputWrapper { ...props } forwardedRef={ ref } />;
			} )
		)
	);
};

export default withUserMentions;
