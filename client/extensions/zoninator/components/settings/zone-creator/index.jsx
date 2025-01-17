import { localize } from 'i18n-calypso';
import { flowRight } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import HeaderCake from 'calypso/components/header-cake';
import PageViewTracker from 'calypso/lib/analytics/page-view-tracker';
import { getSelectedSiteId, getSelectedSiteSlug } from 'calypso/state/ui/selectors';
import { settingsPath } from '../../../app/util';
import { addZone } from '../../../state/zones/actions';
import { isSavingZone } from '../../../state/zones/selectors';
import ZoneDetailsForm from '../../forms/zone-details-form';

class ZoneCreator extends PureComponent {
	static propTypes = {
		addZone: PropTypes.func.isRequired,
		siteId: PropTypes.number,
		siteSlug: PropTypes.string,
		translate: PropTypes.func.isRequired,
	};

	save = ( data ) => this.props.addZone( this.props.siteId, this.props.siteSlug, data );

	render() {
		const { siteSlug, translate } = this.props;

		return (
			<div>
				<PageViewTracker
					path="/extensions/zoninator/new/:site"
					title="WP Zone Manager > New Zone"
				/>

				<HeaderCake backHref={ `${ settingsPath }/${ siteSlug }` }>
					{ translate( 'Add a zone' ) }
				</HeaderCake>

				<ZoneDetailsForm
					label={ translate( 'New zone' ) }
					onSubmit={ this.save }
					submitting={ this.props.isSavingZone }
				/>
			</div>
		);
	}
}

const connectComponent = connect(
	( state ) => {
		const siteId = getSelectedSiteId( state );

		return {
			siteId,
			siteSlug: getSelectedSiteSlug( state ),
			isSavingZone: isSavingZone( state, siteId ),
		};
	},
	{ addZone }
);

export default flowRight( connectComponent, localize )( ZoneCreator );
