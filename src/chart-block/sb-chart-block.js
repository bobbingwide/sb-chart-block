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
			dataset.backgroundColor = getBackgroundColors(this.theme);
		} else {
			dataset.backgroundColor = getBackgroundColor(i, this.theme);
			dataset.borderColor = getBorderColor( i, this.theme );
		}

		dataset.borderWidth = 1;
		dataset.fill = false;

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
		console.log( this.series );
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
		if ( 'pie' == this.attributes.type ) {
			return( {
				maintainAspectRatio: false,
			} );
		}
		return(
		{
			maintainAspectRatio: false,
			'scales': {
				'yAxes': [{
					'ticks': {
						'beginAtZero': true
					}
				}],

			}
		});
	}

	/**
	 * Displays the Chart.
	 *
	 * @param ctx
	 * @param type
	 * @param data
	 * @param options
	 */
	showChart( ctx, type, data, options ) {
		var myLineChart = null;
		Chart.helpers.each(Chart.instances, function(instance){
			if( instance.ctx === ctx ) {
				myLineChart = instance;
			}
		});
		if ( myLineChart ) {
			myLineChart.destroy();
		}
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
	 */
	runChart( attributes ) {

		//this.setStuff( attributes );
		var ctx = document.getElementById( attributes.myChartId );
		if( ctx ) {
			this.setStuff( attributes );
			ctx = ctx.getContext('2d');
			var data = {
				labels: this.getLabels(),
				datasets: this.getDatasets(),
			};
			var options = this.getOptions();
			var myLineChart = this.showChart( ctx, attributes.type, data, options );
			//var myLineChart = new Chart(ctx, {type: attributes.type, data: data, options: options});
			//setAttributes( )
			return myLineChart;
		}
	}


}




