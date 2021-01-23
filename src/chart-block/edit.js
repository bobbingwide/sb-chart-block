/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * These imports were added using the best guess technique.
 *
 */
import { ServerSideRender } from '@wordpress/editor';
import { Fragment } from '@wordpress/element';
import { InspectorControls, PlainText, BlockControls } from '@wordpress/block-editor';
//const { InspectorControls } = wp.blockEditor;
// deprecated.js?ver=cd9e35508705772fbc5e2d9736bde31b:177 wp.editor.InspectorControls is deprecated. Please use wp.blockEditor.InspectorControls instead.
import { TextControl, PanelBody, SelectControl, Toolbar, ToolbarButton, PanelRow, ToggleControl, RangeControl } from '@wordpress/components';
import { map } from 'lodash';
import { useEffect } from '@wordpress/element';
import { withInstanceId } from '@wordpress/compose';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { SB_chart_block } from './sb-chart-block';
import { ChartToolbar } from './chart-toolbar';

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
function edit ( { attributes, className, isSelected, setAttributes, instanceId } )   {

	//console.log( instanceId );
	const myChartId = `myChart-${ instanceId }`;
	//console.log( myChartId );
	setAttributes( { myChartId: myChartId });


	const onChangeType = ( event ) => {
		//console.log( "Set type:" + event );
		setAttributes( { type: event } );
	};

	const onChangeTheme = ( event ) => {
		setAttributes( { theme: event } );
	};

	const onChangeContent = (value) => {
		value = value.replace( /<br>/g, '\n' );
		//console.log( value );
		setAttributes({content: value});
	};

	const onChangeStacked = (value) => {
		setAttributes( { stacked: !attributes.stacked });
	}

	const onChangeFill = (value) => {
		setAttributes( { fill: !attributes.fill });
	}

	const onChangeHeight = (value ) => {
		setAttributes( { height: value });
	}

	const onChangeBeginYAxisAt0 = ( value ) => {
		setAttributes( { beginYAxisAt0: !attributes.beginYAxisAt0});
	}

	const help = __( "Choose Line, Bar, Horizontal bar or Pie.", 'sb-chart-block');

	const typeOptions = {
		"line": __( "Line chart", 'sb-chart-block' ),
		"bar" : __( "Bar chart", 'sb-chart-block' ),
		"horizontalBar" : __( "Horizontal bar chart", 'sb-chart-block'),
		"pie": __( "Pie chart", 'sb-chart-block' )
	};

	const themeOptions = {
		"Gutenberg": "Gutenberg palette",
		"Chart" : "Chart",
		"Tertiary": "Chartist or Tertiary",
		"Visualizer": "Visualizer",
	};

	var mappedTypeOptions = map(typeOptions, (key, label) => ({value: label, label: key}));

	var mappedThemeOptions = map(themeOptions, (key, label) => ({value: label, label: key}));

	const onRefreshButton = ( event ) => {
		//console.log( event );
		//var chartBlock = new SB_chart_block();
		//chartBlock.runChart( attributes );
	};

	useEffect( () => {
		if ( attributes.content ) {
			var chartBlock = new SB_chart_block();
			chartBlock.runChart( attributes );
		}
	} );

	//console.log( 'Edit()');
	//console.log( attributes );

	return (
		<Fragment>
			<BlockControls>
				<ChartToolbar value={attributes.type} onChange={ onChangeType } />
				{ false &&
				<ToolbarButton
					label="Refresh"
					onClick={ onRefreshButton }
				>
					Refresh
				</ToolbarButton>
				}
			</BlockControls>

			<InspectorControls>
				<PanelBody>
					<SelectControl label={__("Type",'sb-chart-block')} value={attributes.type} onChange={onChangeType} options={mappedTypeOptions} help={help} />
					<PanelRow>
						<ToggleControl
							label={ __( 'Stacked', 'sb-chart-block' ) }
							checked={ !! attributes.stacked }
							onChange={ onChangeStacked }

						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Begin Y-axis at 0', 'sb-chart-block' ) }
							checked={ !! attributes.beginYAxisAt0 }
							onChange={ onChangeBeginYAxisAt0 }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Fill', 'sb-chart-block' ) }
							checked={ !! attributes.fill }
							onChange={ onChangeFill }
						/>
					</PanelRow>

				</PanelBody>
				<PanelBody>
					<SelectControl label={__("Theme",'sb-chart-block')} value={attributes.theme} onChange={onChangeTheme} options={mappedThemeOptions}  />
				</PanelBody>
				<PanelBody>

					<PanelRow>
						<RangeControl
							label={ __( "Height (pixels)", 'sb-chart-block' ) }
							value={ attributes.height }
							initialPosition={450}
							onChange={ onChangeHeight }
							min={ 100 }
							max={ 1000 }
							allowReset
						/>

					</PanelRow>

				</PanelBody>
			</InspectorControls>

			<div className="wp-block-oik-sb-chart">
				{attributes.content &&
				<div className={"chartjs"} style={ { height: attributes.height} }>
					<canvas id={attributes.myChartId} height="450px"></canvas>
				</div>
				}

				<PlainText
					value={attributes.content}
					placeholder={__('Enter Chart data in CSV format')}
					onChange={onChangeContent}
				/>

				{ false &&
					<ServerSideRender block="oik-sb/chart" attributes={attributes} />
				}
			</div>
		</Fragment>

	);
}

/**
 * I honestly don't understand Higher Order Components,
   but this seems to wrap the edit component with withInstanceId,
   which enables the function to access the instance ID.
   The save() function doesn't get this parameter, but it does get attributes.
   So we use the myChartId attribute to pass the ID for the canvas.
 */
export default withInstanceId( edit );
