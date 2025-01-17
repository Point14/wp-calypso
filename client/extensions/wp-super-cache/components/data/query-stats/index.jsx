import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { generateStats } from '../../../state/stats/actions';
import { isGeneratingStats } from '../../../state/stats/selectors';

class QueryStats extends Component {
	UNSAFE_componentWillMount() {
		this.generateStats( this.props );
	}

	UNSAFE_componentWillReceiveProps( nextProps ) {
		const { siteId } = this.props;

		if ( ! nextProps.siteId || siteId === nextProps.siteId ) {
			return;
		}

		this.generateStats( nextProps );
	}

	generateStats( props ) {
		const { generatingStats, siteId } = props;

		if ( ! generatingStats && siteId ) {
			props.generateStats( siteId );
		}
	}

	render() {
		return null;
	}
}

QueryStats.propTypes = {
	siteId: PropTypes.number,
	generatingStats: PropTypes.bool,
	generateStats: PropTypes.func,
};

export default connect(
	( state, { siteId } ) => {
		return {
			generatingStats: isGeneratingStats( state, siteId ),
		};
	},
	{ generateStats }
)( QueryStats );
