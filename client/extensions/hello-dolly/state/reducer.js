import { ROUTE_SET, SECTION_SET, SITE_SETTINGS_SAVE } from 'calypso/state/action-types';
import { HELLO_DOLLY_NEXT_LYRIC } from './action-types';
import lyrics from './lyrics';

export default function lyricIndex( state = 0, action ) {
	switch ( action.type ) {
		case ROUTE_SET:
		case SECTION_SET:
		case SITE_SETTINGS_SAVE:
		case HELLO_DOLLY_NEXT_LYRIC:
			return advanceToNextLyric( state );
		default:
			return state;
	}
}

function advanceToNextLyric( index ) {
	return ( index + 1 ) % lyrics.length;
}
