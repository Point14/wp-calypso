/**
 * External dependencies
 */
import { keyBy, omit, without } from 'lodash';

/**
 * Internal dependencies
 */
import {
	KEYRING_CONNECTION_DELETE,
	KEYRING_CONNECTIONS_RECEIVE,
	KEYRING_CONNECTIONS_REQUEST,
	KEYRING_CONNECTIONS_REQUEST_FAILURE,
	KEYRING_CONNECTIONS_REQUEST_SUCCESS,
	P2_CONNECTIONS_RECEIVE,
	P2_CONNECTIONS_REQUEST,
	P2_CONNECTIONS_REQUEST_FAILURE,
	P2_CONNECTIONS_REQUEST_SUCCESS,
	P2_CONNECTION_DELETE,
	PUBLICIZE_CONNECTION_CREATE,
	PUBLICIZE_CONNECTION_DELETE,
} from 'calypso/state/action-types';
import { combineReducers, withSchemaValidation } from 'calypso/state/utils';
import { itemSchema } from './schema';

// Tracks fetching state for keyring connections
export const isFetching = ( state = false, action ) => {
	switch ( action.type ) {
		case P2_CONNECTIONS_REQUEST:
		case KEYRING_CONNECTIONS_REQUEST:
			return true;
		case P2_CONNECTIONS_REQUEST_SUCCESS:
		case KEYRING_CONNECTIONS_REQUEST_SUCCESS:
			return false;
		case P2_CONNECTIONS_REQUEST_FAILURE:
		case KEYRING_CONNECTIONS_REQUEST_FAILURE:
			return false;
	}

	return state;
};

// Stores the list of available keyring connections
export const items = withSchemaValidation( itemSchema, ( state = {}, action ) => {
	switch ( action.type ) {
		case P2_CONNECTIONS_RECEIVE:
		case KEYRING_CONNECTIONS_RECEIVE: {
			const { connections } = action;

			return {
				...keyBy( connections, 'ID' ),
			};
		}

		case P2_CONNECTION_DELETE:
		case KEYRING_CONNECTION_DELETE: {
			const { connection } = action;
			return omit( state, connection.ID );
		}

		case PUBLICIZE_CONNECTION_CREATE: {
			const { connection } = action;
			const { keyring_connection_ID: id, site_ID: siteId } = connection;
			const keyringConnection = state[ id ];
			const sites = [ ...keyringConnection.sites, siteId.toString() ];

			return { ...state, [ id ]: { ...keyringConnection, sites } };
		}

		case PUBLICIZE_CONNECTION_DELETE: {
			const { connection } = action;
			const { keyring_connection_ID: id, site_ID: siteId } = connection;
			const keyringConnection = state[ id ];
			const sites = without( keyringConnection.sites, siteId.toString() );

			return { ...state, [ id ]: { ...keyringConnection, sites } };
		}
	}

	return state;
} );

export default combineReducers( {
	isFetching,
	items,
} );
