/**
 * External dependencies
 */
import { find } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, isRTL } from '@wordpress/i18n';
import { ToolbarGroup, Dashicon } from '@wordpress/components';
import { chartLine } from '@wordpress/icons';

import { chartBar } from './chart-bar';
import { chartBarH } from './chart-bar-h';
import { chartPie } from './chart-pie';

/* const chartBarH= (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<Path
			fillRule="evenodd"
			d="M11.25 5h1.5v15h-1.5V5zM6 10h1.5v10H6V10zm12 4h-1.5v6H18v-6z"
			clipRule="evenodd"
		/>
	</SVG>
);

If we use
icon: <Dashicon icon="chart-bar">
then we get some CSS positioning problems.
 */



const DEFAULT_CHART_CONTROLS = [
	{
		icon: chartLine,
		title: __( 'Line chart' ),
		type: 'line',
	},
	{
		icon: chartBar,
		title: __( 'Bar chart' ),
		type: 'bar',
	},
	{
		icon: chartBarH,
		title: __( 'Horizontal bar chart', 'sb-chart-block' ),
		type: 'horizontalBar',
	},
	{
		icon: chartPie,
		title: __( 'Pie chart' ),
		type: 'pie',
	},
];

const POPOVER_PROPS = {
	position: 'bottom right',
	isAlternate: true,
};

export function ChartToolbar( props ) {
	const {
		value,
		onChange,
		typeControls = DEFAULT_CHART_CONTROLS,
		label = __( 'Chart type' ),
		describedBy = __( 'Change chart type' ),
		isCollapsed = true,
	} = props;

	function applyOrUnset( type ) {
		return () => onChange( value === type ? undefined : type );
	}

	const activeChart = find(
		typeControls,
		( control ) => control.type === value
	);

	function setIcon() {
		if ( activeChart ) return activeChart.icon;
	}

	return (
		<ToolbarGroup
			isCollapsed={ isCollapsed }
			icon={ setIcon() }
			label={ label }
			toggleProps={ { describedBy } }
			popoverProps={ POPOVER_PROPS }
			controls={ typeControls.map( ( control ) => {
				const { type } = control;
				const isActive = value === type;

				return {
					...control,
					isActive,
					role: isCollapsed ? 'menuitemradio' : undefined,
					onClick: applyOrUnset( type ),
				};
			} ) }
		/>
	);
}

export default ChartToolbar;
