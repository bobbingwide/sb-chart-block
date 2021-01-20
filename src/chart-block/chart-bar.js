/**
 * WordPress dependencies
 */
import { SVG, Path } from '@wordpress/components';

export const chartBar = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<Path
			fillRule="evenodd"
			d="m3 18v-11h3v11v0h-3m5 0v-9h3v9h-3m5 0v-13v0h3v13h-3"
			clipRule="evenodd"
		/>
	</SVG>
);

// d="M3 16V5H6V16V16H3M8 16V7H11V16H8M13 16V3V3H16V16H13"
//m5 14v-11h3v11v0h-3m5 0v-9h3v9h-3m5 0v-13v0h3v13h-3
