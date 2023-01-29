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
import { Fragment } from '@wordpress/element';
import { InspectorControls, PlainText, BlockControls } from '@wordpress/block-editor';
import { TextControl, PanelBody, SelectControl, Toolbar, ToolbarButton, PanelRow, ToggleControl, RangeControl } from '@wordpress/components';
import { map } from 'lodash';
import { useEffect, useRef } from '@wordpress/element';
import { withInstanceId } from '@wordpress/compose';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { SB_chart_block } from './sb-chart-block';
import { ChartToolbar } from './chart-toolbar';
import { getThemeOptions } from './theme-colors';

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

	const onChangeOpacity = (value ) => {
		setAttributes( { opacity: value });
	}

	const onChangeTime = ( value ) => {
		setAttributes( { time: !attributes.time });
	}

	const onChangeTimeunit = ( value ) => {
		setAttributes( { timeunit: value } );
		onCaughtError( null );
	};

	const onChangeBarThickness = (value ) => {
		setAttributes( { barThickness: value });
	}

	const onChangeTension = ( value) => {
		setAttributes( { tension: value });
	}

	const onChangelabelsFontSize = ( value ) => {
		setAttributes( {labelsFontSize: value });
	}

	const onChangexTicksFontSize = ( value ) => {
		setAttributes( {xTicksFontSize: value });
	}

	const onChangebackgroundColors = ( value ) => {
		setAttributes( {backgroundColors: value });
	}

	const onChangeborderColors = ( value ) => {
		setAttributes( {borderColors: value });
	}

	const onChangeyAxes = ( value ) => {
		setAttributes( {yAxes: value });
	}

	const help = __( "Choose Line, Bar, Horizontal bar or Pie.", 'sb-chart-block');

	const typeOptions = {
		"line": __( "Line chart", 'sb-chart-block' ),
		"bar" : __( "Bar chart", 'sb-chart-block' ),
		"horizontalBar" : __( "Horizontal bar chart", 'sb-chart-block'),
		"pie": __( "Pie chart", 'sb-chart-block' )
	};

	const themeOptions = getThemeOptions();

	const timeunitOptions = {
		"year": __( "Year", 'sb-chart-block'),
		"quarter": __( "Quarter", 'sb-chart-block'),
		"month": __( "Month", 'sb-chart-block'),
		"week": __( "Week", 'sb-chart-block'),
		"day": __( "Day", 'sb-chart-block'),
		"hour": __( "Hour", 'sb-chart-block'),
		"minute": __( "Minute", 'sb-chart-block'),
		"second": __( "Second", 'sb-chart-block'),
		"millisecond": __( "Millisecond", 'sb-chart-block'),
	};

	var mappedTypeOptions = map(typeOptions, (key, label) => ({value: label, label: key}));

	var mappedTimeunitOptions = map(timeunitOptions, (key, label) => ({value: label, label: key}));
	const myRef = useRef();

	const onCaughtError = ( error ) => {
		console.log( error );
		setAttributes( { error: error});
	}

	const onRefreshButton = ( event ) => {
		console.log( event );
		onCaughtError( null );
		var chartBlock = new SB_chart_block();
		try {
			chartBlock.runChart(attributes, myRef);
		} catch ( error) {
			onCaughtError( error );

		}
	};

	useEffect( () => {
		if ( attributes.content && !attributes.error  ) {
			var chartBlock = new SB_chart_block();
			try {
				chartBlock.runChart(attributes, myRef)
			} catch (error) {
				onCaughtError( error );

			}
		}
	} );

	/**
	 * Attempts to make sense of the error.
	 * @returns {JSX.Element}
	 */
	const interpretError = () => {

		if ( attributes.time ){
			var exampleDate = new Date().toISOString();
			exampleDate = exampleDate.replace( 'T', ' ');
			exampleDate = exampleDate.replace( 'Z', '');
			var text = __("Error displaying chart. Please check your dates then choose Refresh, or change the Time unit.", 'sb-chart-block' );
			var expected = __( "Expected date format: ccyy-mm-dd hh:mm:ss.ttt", 'sb-chart-block' );
			var forexample = __( 'For example: ', 'sb-chart-block' ) + ' ' + exampleDate;
			var additional = __( 'Message: ' , 'sb-chart-block' ) + ' ';
			return( <p>{text}<br/>{expected}<br />{forexample}<br />{additional} {attributes.error.message}</p> );
		} else {
			console.log( attributes.error );
			return( <p>{__( "An error occurred displaying the chart.", 'sb-chart-block' )}
				<br />{attributes.error.message}</p> );
		}
	}

	var errorMessage = ( attributes.error) ? interpretError() : null;

	const blockProps = useBlockProps();

	//console.log( 'Edit()');
	//console.log( attributes );



	return (
		<Fragment>
			<BlockControls>
				<ChartToolbar value={attributes.type} onChange={ onChangeType } />
				{ true &&
				<ToolbarButton
					label={__("Refresh", 'sb-chart-block' )}
					onClick={ onRefreshButton }
				>{__('Refresh', 'sb-chart-block')}
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
					<PanelRow>
						<ToggleControl
							label={ __( 'Time line', 'sb-chart-block' ) }
							checked={ !! attributes.time }
							onChange={ onChangeTime }
						/>
					</PanelRow>

						<SelectControl label={__("Time unit (stepSize)",'sb-chart-block')} value={attributes.timeunit} onChange={onChangeTimeunit} options={mappedTimeunitOptions}  />
					<PanelRow>
						<TextControl
							label={ __( "Y-axes", 'sb-chart-block' ) }
							value={ attributes.yAxes }
							onChange={ onChangeyAxes }
						/>
					</PanelRow>


				</PanelBody>
				<PanelBody>
					<SelectControl label={__("Color palette",'sb-chart-block')} value={attributes.theme} onChange={onChangeTheme} options={themeOptions}  />
					<PanelRow>
					<TextControl
						label={ __( "Background color overrides", 'sb-chart-block' ) }
						value={ attributes.backgroundColors }
						onChange={ onChangebackgroundColors }

					/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={ __( "Border color overrides", 'sb-chart-block' ) }
							value={ attributes.borderColors }
							onChange={ onChangeborderColors }
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody>
					<PanelRow>
						<RangeControl
							label={ __( "Opacity", 'sb-chart-block' ) }
							value={ attributes.opacity }
							initialPosition={ attributes.opacity }
							onChange={ onChangeOpacity }
							min={ 0 }
							max={ 1 }
							step={ 0.1}
							allowReset
						/>

					</PanelRow>
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
				<PanelBody>
					<PanelRow>
						<RangeControl
							label={ __( "Bar thickness (pixels)", 'sb-chart-block' ) }
							value={ attributes.barThickness }
							initialPosition={attributes.barThickness}
							onChange={ onChangeBarThickness }
							min={ 1 }
							max={ 100 }
							allowReset
						/>

					</PanelRow>
				</PanelBody>

				<PanelBody>

					<PanelRow>
							<RangeControl
								label={ __( "Tension", 'sb-chart-block' ) }
								value={ attributes.tension }
								initialPosition={ attributes.tension }
								onChange={ onChangeTension }
								min={ 0 }
								max={ 1 }
								step={ 0.1}
								allowReset
							/>
					</PanelRow>
				</PanelBody>
				<PanelBody>

					<PanelRow>
						<RangeControl
							label={ __( "Legend font size", 'sb-chart-block' ) }
							value={ attributes.labelsFontSize }
							initialPosition={ attributes.labelsFontSize }
							onChange={ onChangelabelsFontSize }
							min={ 6 }
							max={ 100 }
							step={ 2 }
							allowReset
						/>
					</PanelRow>
					<PanelRow>
						<RangeControl
							label={ __( "X-axis font size", 'sb-chart-block' ) }
							value={ attributes.xTicksFontSize }
							initialPosition={ attributes.xTicksFontSize }
							onChange={ onChangexTicksFontSize }
							min={ 6 }
							max={ 100 }
							step={ 2 }
							allowReset
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps}>
				{attributes.content &&
				<div className={"chartjs"} style={ { height: attributes.height} }>
					<canvas id={attributes.myChartId} height="450px" ref={myRef}></canvas>
				</div>
				}
				{ attributes.error &&
				<div className={"error"}>{errorMessage}</div>
				}
				<PlainText
					value={attributes.content}
					placeholder={__('Enter Chart data in CSV format')}
					onChange={onChangeContent}
				/>


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
