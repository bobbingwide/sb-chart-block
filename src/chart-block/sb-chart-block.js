/**
 * JavaScript equivalent to the logic in class SB_chart_block for setting values
 * from content.
 *
 * data:
 *   labels:
 *   datasets:
 *     { label:  data:}
 *     ...
 *
 *  Options is another thing.
 *
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */

const _ = require( 'lodash' );

export class SB_chart_block {

	constructor() {
		console.log( 'constructor');
		this.datasets = [];
		this.labels = [];
	}

	setStuff( attributes) {
		this.setLines( attributes.content );
	}

	setLines( content ) {
		console.log( content );
		this.lines = content.split( "\n" );
		// 		$content=trim( $content );
		// $content = html_entity_decode( $content );
		// $content=str_replace( '<br />', '', $content );
		// $lines  =explode( "\n", $content );
		console.log( this.lines );
		this.labels = this.lines.shift();
		this.asMatrix( this.lines );
		this.transposed = this.transpose( this.matrix );
		// 	this.datasets = [];
		console.log( this.transposed );

	}

	asMatrix( lines ) {
		this.matrix = [];
		for (const line of lines) {
			this.matrix.push(line.split(','));
		}
	}

	transpose( matrix) {
		return _.zip(...matrix);
	}

	getDatasets() {
		return (
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
		);

	}

	getLabels() {
		return this.transposed[0];
	}

	getOptions() {
		return(
		{
			'scales': {
				'yAxes': [{
					'ticks': {
						'beginAtZero': true
					}
				}]
			}
		});
	}




	runmychart_dummydata( attributes ) {
		this.setStuff( attributes );
		var ctx = document.getElementById('myChart1').getContext('2d');
		var data = {
			labels: this.getLabels(),
			datasets: this.getDatasets(),
		};
		var options = this.getOptions();
		var myLineChart = new Chart(ctx, {type: attributes.type, data: data, options: options});
	}


}




