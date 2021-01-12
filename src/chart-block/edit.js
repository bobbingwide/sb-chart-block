/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * These imports were added using the best guess technique.
 * @TODO Confirm what they should be!
 */
import { ServerSideRender } from '@wordpress/editor';
import { Fragment} from '@wordpress/element';
import { InspectorControls, PlainText, BlockControls } from '@wordpress/block-editor';
//const { InspectorControls } = wp.blockEditor;
// deprecated.js?ver=cd9e35508705772fbc5e2d9736bde31b:177 wp.editor.InspectorControls is deprecated. Please use wp.blockEditor.InspectorControls instead.
import { TextControl, PanelBody, SelectControl, Toolbar, ToolbarButton } from '@wordpress/components';
import { map } from 'lodash';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { SB_chart_block } from './sb-chart-block';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props]           Properties passed from the editor.
 * @param {string} [props.className] Class name generated for the block.
 *
 * @return {WPElement} Element to render.
 */
export default function edit ( { attributes, className, isSelected, setAttributes } )   {

	const onChangeType = ( event ) => {
		console.log( "Set type:" + event );
		setAttributes( { type: event } );
	};

	const onChangeTheme = ( event ) => {
		setAttributes( { theme: event } );
	};

	const onChangeContent = (value) => {
		value = value.replace( /<br>/g, '\n' );
		console.log( value );
		setAttributes({content: value});
	};

	const help = __( "Line, Bar or Pie", 'sb-chart-block');

	const typeOptions = {
		"line": "Line chart",
		"bar" : "Bar chart",
		"pie": "Pie chart",
	};

	const themeOptions = {
		"Gutenberg": "Gutenberg palette",
		"Chart" : "Chart",
		"Tertiary": "Chartist or Tertiary",
		"Visualiser": "Visualiser",
	};

	var mappedTypeOptions = map(typeOptions, (key, label) => ({value: label, label: key}));

	var mappedThemeOptions = map(themeOptions, (key, label) => ({value: label, label: key}));


	const onRefreshButton = ( event ) => {
		//alert( 'Refresh');
		console.log( event );
		//window.myLineChart.update();
		var chartBlock = new SB_chart_block();
		chartBlock.runmychart_dummydata( attributes );


	};


	return (
		<Fragment>
			<BlockControls>
				<ToolbarButton
					label="Refresh"
					onClick={ onRefreshButton }
				>
					Refresh
				</ToolbarButton>
			</BlockControls>



			<InspectorControls>

				<PanelBody>
					<SelectControl label={__("Type",'sb-chart-block')} value={attributes.type} onChange={onChangeType} options={mappedTypeOptions} help={help} />
				</PanelBody>
				<PanelBody>
					<SelectControl label={__("Theme",'sb-chart-block')} value={attributes.theme} onChange={onChangeTheme} options={mappedThemeOptions}  />
				</PanelBody>
			</InspectorControls>
			<div className="wp-block-sb-chart">
				<PlainText

					value={attributes.content}
					placeholder={__('Enter Chart data in CSV format')}
					onChange={onChangeContent}
				/>
			</div>
					{ true &&
						<ServerSideRender
						block="oik-sb/chart" attributes={attributes}
						/>
					}
		</Fragment>

	);
}
