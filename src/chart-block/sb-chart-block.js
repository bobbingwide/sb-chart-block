/**
 * JavaScript equivalent to the logic in class SB_chart_block for setting values
 * from content and attributes options.
 *
 * ```
 * data:
 *   labels:
 *   datasets:
 *     { label:  data:}
 *     ...
 *```
 *
 * ```
 *  options:
 *  	scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}],

			}
 * ```
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */

const _ = require( 'lodash' );

import { getBackgroundColors, getBackgroundColor, getBorderColor } from './theme-colors';
import { getOverrideBackgroundColors, getOverrideBackgroundColor, getOverrideBorderColor } from './override-colors';

export class SB_chart_block {

	constructor() {
		console.log('constructor');
		this.datasets = [];
		this.labels = [];
	}

	setStuff(attributes) {
		this.setLines(attributes.content);
		this.theme = attributes.theme;
		this.attributes = attributes;
		console.log( this.attributes );
	}

	setLines(content) {
		console.log(content);
		this.lines = content.split("\n");
		// 		$content=trim( $content );
		// $content = html_entity_decode( $content );
		// $content=str_replace( '<br />', '', $content );
		// $lines  =explode( "\n", $content );
		console.log(this.lines);

		// Convert the first line into an array of series labels.
		this.labels = this.lines.shift();
		this.labels = this.labels.split(',');

		this.asMatrix(this.lines);
		this.series = this.transpose(this.matrix);
		// 	this.datasets = [];
		console.log(this.series);

	}

	asMatrix(lines) {
		this.matrix = [];
		for (const line of lines) {
			this.matrix.push(line.split(','));
		}
	}

	transpose(matrix) {
		return _.zip(...matrix);
	}

	getLegend(i) {
		return this.labels[i];
	}


	/*
	$datasets=[];

		for ( $index=1; $index < count( $this->series ); $index ++ ) {
			$dataset                 =new stdClass;
			$dataset->label          = $this->get_legend( $index );
			$dataset->data           =$this->series[ $index ];
			$dataset->backgroundColor= $this->get_backgroundColor( $index );
			$dataset->borderColor = $this->get_borderColor( $index );
			$dataset->borderWidth    = 1;
			$datasets[]        =$dataset;
		}
		return $datasets;

	 */
	getDataset( i ) {

		var dataset = new Object( {} );
		dataset.label = this.getLegend( i );
		dataset.data = this.series[i];
		if ( 'pie' === this.attributes.type ) {
			//dataset.backgroundColor = getBackgroundColors(this.theme, this.attributes.opacity);
			dataset.backgroundColor = getOverrideBackgroundColors( this.theme, this.attributes.opacity, this.attributes.backgroundColors );
		} else {
			dataset.backgroundColor = getOverrideBackgroundColor(i, this.theme, this.attributes.opacity, this.attributes.backgroundColors );
			dataset.borderColor = getOverrideBorderColor( i, this.theme, this.attributes.opacity, this.attributes.backgroundColors, this.attributes.borderColors );
		}

		dataset.borderWidth = 1;
		dataset.fill = this.attributes.fill;
		if ( this.attributes.barThickness ) {
			dataset.barThickness = this.attributes.barThickness;
		}
		dataset.tension = this.attributes.tension;

		return dataset;
		/*
		var sets =
		[{
			"label": "B",
			"data": ["2", "4"],
			"backgroundColor": "rgba( 247, 141, 167, 0.9 )",
			"borderColor": "rgba( 247, 141, 167, 1 )",
			"borderWidth": 1
		}, {
			"label": "C",
			"data": ["3", "5"],
			"backgroundColor": "rgba( 207, 46, 46, 0.9 )",
			"borderColor": "rgba( 207, 46, 46, 1 )",
			"borderWidth": 1
		}]
		i--;
		return sets[i];

		 */
	}

	getDatasets() {
		//console.log( this.series );
		var datasets = [];
		for (let i = 1; i < this.series.length; i++) {
			datasets.push( this.getDataset( i ));
		}
		console.log( datasets );
		return datasets;
		}

	getLabels() {
		return this.series[0];
	}

	getOptions() {
		var options = new Object( {} );
		options.maintainAspectRatio = false;
		options.plugins = new Object( { legend: { labels: { font: {size: 12 }}}} );
		options.plugins.legend.labels.font.size = this.attributes.labelsFontSize;
		/*
		plugins: {
			legend: {
				labels: {
					font: {
						size: 14
					}
				}

		 */
		if ( 'pie' == this.attributes.type ) {
			return( options );
		}

		options.scales = new Object( {} );
		var beginAtZero = this.attributes.beginYAxisAt0;
		//options.scales.y = this.getYaxis();
		//	new Object(  { beginAtZero: beginAtZero, stacked: this.attributes.stacked  } )


		//if ( this.attributes.stacked ) {
		//	options.scales.x = this.getXaxis();// new Object({stacked: true});
		//}
		//console.log( options );
		var timeOptions = this.getAxisTimeOptions();
		options.scales.y = new Object( {} );
		options.scales.x = new Object( {} );
		if ( 'horizontalBar' === this.attributes.type ) {
			options.indexAxis = 'y';
			options.scales.y = timeOptions;
		} else {
			options.scales.x = timeOptions;
		}
		options.scales.y.beginAtZero = beginAtZero;
		options.scales.y.stacked = this.attributes.stacked;
		options.scales.x.stacked = this.attributes.stacked;
		//console.log( options );
		options.scales.x.ticks = new Object( {  font: {size: this.attributes.xTicksFontSize }} );
		//options.plugins.legend.labels.font.size = this.attributes.labelsFontSize;

		return options;


	}

	getAxisTimeOptions() {
		var timeOptions = new Object({});
		if ( this.attributes.time ) {
			timeOptions.type = 'time';
			timeOptions.time = new Object({
				unit: this.attributes.timeunit,
				displayFormats: {
					minute: 'dd MMM hh:mm',
					hour: 'dd MMM hh:mm',
					day: 'dd MMM'
				}
			});
		}
		return timeOptions;
	}

	/**
	 * Displays the Chart.
	 *
	 * @param ctx
	 * @param type
	 * @param data
	 * @param options
	 */
	showChart( ctx, type, data, options, attributes ) {
		var myLineChart = null;
		Chart.helpers.each(Chart.instances, function(instance){
			if( instance.ctx === ctx ) {
				myLineChart = instance;
			}
		});
		if ( myLineChart ) {
			myLineChart.destroy();
		}
		//console.log( Chart.defaults );
		//Chart.defaults.font.size= attributes.labelsFontSize;
		myLineChart = new Chart(ctx, {type: type, data: data, options: options});

	}

	/**
	 * Runs the chart indicated by myChartId.
	 *
	 * This appears to create multiple charts in the same canvas.
	 * How do we use update() if the myLineChart already exists?
	 * Can we use window.myCharts as an associative array?
	 *
	 *
	 * @param attributes
	 * @param chartRef - the ref for the currently selected chart @since issue #16
	 */
	runChart( attributes, chartRef ) {

		/* From Gutenberg 11.4.0 we have to obtain the context (ctx) from the currently selected chart
		   as indicated by the chartRef parameter.
		   This is to cater for the fact that we may be invoked in an iframe and can't use `document`.

		   Since we no longer need to call getElementById(), it would appear
		   that myChartId could now be an unnecessary attribute.
		 */
		var ctx = chartRef.current;
		//console.log( ctx );
		if( ctx ) {
			this.setStuff( attributes );
			ctx = ctx.getContext('2d');
			var data = {
				labels: this.getLabels(),
				datasets: this.getDatasets(),
			};
			var options = this.getOptions();
			var chartType = ( 'horizontalBar' === attributes.type ) ? 'bar' : attributes.type;
			var myLineChart = this.showChart( ctx, chartType, data, options, attributes );
			//var myLineChart = new Chart(ctx, {type: attributes.type, data: data, options: options});
			//setAttributes( )
			return myLineChart;
		} else {
			console.log( "No ctx for: " + attributes.myChartId );
		}
	}

}
