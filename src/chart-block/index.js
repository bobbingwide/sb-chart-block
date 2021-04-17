/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

import { getDefaultTheme } from './theme-colors';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'oik-sb/chart', {
	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __( 'Chart', 'sb-chart-block' ),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __( 'Displays a chart for CSV content.', 'sb-chart-block' ),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
	 */
	category: 'widgets',

	/**
	 * An icon property should be specified to make it easier to identify a block.
	 * These can be any of WordPress’ Dashicons, or a custom svg element.
	 */
	icon: 'chart-line',

	keywords: [
		__( 'Chart', 'sb-chart-block' ),
		__( 'Line', 'sb-chart-block' ),
		__( 'Bar', 'sb-chart-block' ),
		__( 'Horizontal bar', 'sb-chart-block'),
		__( 'Pie', 'sb-chart-block' ),
	],

	/**
	 * Optional block extended support features.
	 */
	supports: {
		// Removes support for an HTML mode.
		html: false,
		align: false,
	},

	attributes: {
		type: { type: 'string', default: 'line', },
		content: { type: 'string', default: '', },
		theme: { type: 'string', default: getDefaultTheme() },
		myChartId: { type: 'string', default: 'myChart-' },
		stacked: { type: 'boolean', default: false },
		fill: { type: 'boolean', default: false },
		height: { type: 'integer', default: null },
		beginYAxisAt0: { type: 'boolean', default: false },
		opacity: { type: 'number', default: 0.8 }
	},

	// Display a simple pie chart as an example of the Chart block
	example: {
		attributes: {
			type: "pie",
			content: __( "Label,Value\nOne,1\nTwo,2\nThree,3", 'sb-chart-block' ),
			myChartId: "myChartExample"
		}
	},

	/**
	 * @see ./edit.js
	 */
	edit: edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
