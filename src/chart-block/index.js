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

	deprecated: [
		{
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

			save( props ) {

				return (<div className={"chartjs"} style={{height: props.attributes.height}}>
						<canvas id={props.attributes.myChartId}></canvas>
					</div>
				);
			}
		}
	]

} );
