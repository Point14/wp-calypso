import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { requestList } from 'calypso/state/reader/lists/actions';
import { isRequestingList } from 'calypso/state/reader/lists/selectors';

class QueryReaderList extends Component {
	UNSAFE_componentWillMount() {
		if ( ! this.props.isRequestingList ) {
			this.props.requestList( this.props.owner, this.props.slug );
		}
	}

	UNSAFE_componentWillReceiveProps( nextProps ) {
		if (
			nextProps.isRequestingList ||
			( this.props.owner === nextProps.owner && this.props.slug === nextProps.slug )
		) {
			return;
		}

		nextProps.requestList( nextProps.owner, nextProps.slug );
	}

	render() {
		return null;
	}
}

QueryReaderList.propTypes = {
	owner: PropTypes.string,
	slug: PropTypes.string,
	isRequestingList: PropTypes.bool,
	requestList: PropTypes.func,
};

QueryReaderList.defaultProps = {
	requestList: () => {},
};

export default connect(
	( state, ownProps ) => {
		const { owner, slug } = ownProps;
		return {
			isRequestingList: isRequestingList( state, owner, slug ),
		};
	},
	{
		requestList,
	}
)( QueryReaderList );
