<?php

/**
 * @copyright (C) Bobbing Wide 2021
 * @package sb-chart-block
 *
 * Class SB_chart_block
 *
 * Implements the server side for the [chartjs] shortcode and Chart block using Chart.js.
 * Similar to the logic originally developed for Chartist.js, in pompey-chart, but OO.
 */

class SB_chart_block {
	/**
	 * @var array $atts Attributes for the shortcode and block.
	 */
	private $atts;

	/**
	 * @var array $legend Legends for multiple lines or bars
	 */
	private $legend;

	/**
	 * @var array $lines Content as CSV records
	 */
	private $lines;

	/**
	 * @var array $series Lines transposed into series
	 */
	private $series;

	private $data;
	private $options;

	/**
	 * SB_chart_block constructor.
	 */
	function __construct() {
		$this->atts = [];
		$this->legend = [];
		$this->lines = [];
		$this->series = [];
	}

	/**
	 * Renders the Chart
	 * @param $atts
	 * @param $content
	 *
	 * @return string
	 */
	function render( $atts, $content ) {
		//wp_enqueue_script( 'chartjs-script');
		sb_chart_block_enqueue_scripts();
		//$html = sb_chart_block_html( $atts ) ;
		$this->default_atts( $atts );
		$this->prepare_content( $content );
		$html = $this->render_html( $atts, $content);
		return $html;
	}

	/**
	 * Sets $atts from passed attributes.
	 *
	 * @param $atts
	 *
	 * @return array|mixed
	 */

	function default_atts( $atts ) {
		if ( empty( $atts ) ) {
			$atts = [];
		}
		//echo "before";	print_r( $atts );

		$atts['type'] = isset( $atts['type'] ) ? $atts['type'] : 'Line';

		//$atts['height'] = isset( $atts['height'] ) ? $atts['height'] : '450px';

		$atts['type'] = $this->validate_type( $atts['type'] );

		//$atts['tooltips'] = isset( $atts['tooltips']) ? true : false;
		//$atts['stackBars'] = isset( $atts['stackbars']) ? true : false;
		//$atts['horizontalBars'] = isset( $atts['horizontalbars']) ? true : false;
		$atts['class'] = isset( $atts['class'] ) ? $atts['class'] : ''; // ct-golden-section
		//echo "after";
		//print_r( $atts );
		$this->atts = $atts;
		//return $atts;
	}

	function validate_type( $type ) {
		//echo $type;
		switch ( $type ) {
			case 'Line':
			case 'Bar':
			case 'Pie':
				break;
			case 'line':
				$type='Line';
				break;
			case 'bar':
				$type='Bar';
				break;
			case 'pie':
				$type='Pie';
				break;
			default:
				$type='Line';
		}
		//echo $type;
		return $type;
	}

	/**
	 * The content is expected to be in CSV format.
	 * - with column headings to use as the Legend for multiple line/bar charts
	 * - The first column is used for the keys
	 * - Second and subsequent columns for the values
	 *
	 * @param $content
	 *
	 * @return string
	 */
	function prepare_content( $content ) {
		if ( $content ) {
			$content=trim( $content );
			$content=str_replace( '<br />', '', $content );
			$lines  =explode( "\n", $content );
		} else {
			return "No content?";
		}
		//$legend = $lines[0];

		$this->legend=array_shift( $lines );
		$this->lines = $lines;
		$this->transpose( $lines );


	}

	function render_html( $atts, $content ) {
		$this->set_id();
		$script = $this->get_canvas( $atts );
		$script .= '<script>';
		$script .= $this->get_ctx();
		$script .= $this->get_data();
		$script .= $this->get_options();
		$script .= $this->get_newChart( $atts );
		$script.='</script>';
		return $script;
	}

	function set_id() {
		static $count = null;
		$count++;
		$this->id = 'myChart' . $count;
	}

	function get_id() {
		return $this->id;
	}

	function get_canvas( $atts ) {
		return '<canvas id="' . $this->get_id() . '" width="400" height="400"></canvas>';
	}

	function get_ctx() {
		return "var ctx = document.getElementById('" . $this->get_id() . "').getContext('2d');";
	}

	function get_labels() {
		return $this->series[0];
	}


	/**
	 * Transposes the input CSV into the series array.
	 *
	 * $series[0] will be the labels for the x-axis - along the bottom
	 * We assume that there's a value for each row and column.
	 *
	 * @param $lines
	 * @return array
	 */
	function transpose( $lines ) {
		$this->series = [];
		foreach ( $lines as $line ) {
			$values = explode( ',', $line);
			foreach ( $values as $key => $value ) {
				$this->series[ $key ][] = $value;
			}
		}
		return $this->series;
	}


function get_data() {
		$data = "var 		data = {";
		$data .= "labels:" . json_encode( $this->get_labels() ); //  ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		$data .= ',';
		$data .= "
			datasets: [{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}] };";
		return $data;

	}

	function get_options() {
		return "var	options = {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}] 	} };";
	}

	function get_newChart() {
		return "var myLineChart = new Chart(ctx, { type: 'line', data: data, options: options });";
	}

}
