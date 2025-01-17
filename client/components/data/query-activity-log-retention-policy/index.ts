/**
 * External dependencies
 */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Internal dependencies
 */
import { requestSiteRetentionPolicy } from 'calypso/state/activity-log/retention-policy/actions';
import isRequestingSiteRetentionPolicy from 'calypso/state/selectors/is-requesting-site-activity-log-retention-policy';

/**
 * Type dependencies
 */
import { AppState } from 'calypso/types';

const useRequestActivityLogRetentionPolicy = ( siteId: number ) => {
	const dispatch = useDispatch();
	const requesting = useSelector( ( state: AppState ) =>
		isRequestingSiteRetentionPolicy( state, siteId )
	);

	useEffect(
		() => {
			if ( requesting ) {
				return;
			}

			dispatch( requestSiteRetentionPolicy( siteId ) );
		},

		// `requesting` is technically a dependency but we exclude it here;
		// otherwise, it would re-run the effect once the request completes,
		// causing another request to be sent, starting an infinite loop.
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
		[ siteId ]
	);
};

// TODO: Remove this component once ActivityCardList can call hooks,
// then extract `useRequestActivityLogRetentionPolicy` into its own file
type OwnProps = {
	siteId: number;
};

const QueryActivityLogRetentionPolicy: React.FC< OwnProps > = ( { siteId } ) => {
	useRequestActivityLogRetentionPolicy( siteId );
	return null;
};

export default QueryActivityLogRetentionPolicy;
