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

	private $theme;

	private $color_palettes = null;

	/**
	 * SB_chart_block constructor.
	 */
	function __construct() {
		$this->atts = [];
		$this->legend = [];
		$this->lines = [];
		$this->series = [];
		$this->load_color_palettes();
	}

	/**
	 * Renders the Chart
	 * @param $atts
	 * @param $content
	 *
	 * @return string
	 */
	function render( $atts, $content ) {
		sb_chart_block_register_scripts();
		sb_chart_block_enqueue_scripts();
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
		$this->atts = $atts;

		$this->atts['type'] = isset( $this->atts['type'] ) ? $this->atts['type'] : 'line';
		$this->atts['type'] = $this->validate_type( $this->atts['type'] );
		$this->atts['class'] = isset( $this->atts['class'] ) ? $this->atts['class'] : '';
		$this->atts['theme'] = isset( $this->atts['theme'] ) ? $this->atts['theme'] : $this->color_palettes->get_default();

		// Rather than use false, we use 0, otherwise the value doesn't come out
		// when converted to as a literal string.
		// It's different when we use json_decode()!
		$this->atts['stacked'] = isset( $this->atts['stacked'] ) ? $this->atts['stacked'] : 0;
		$this->atts['fill'] = sb_chart_block_array_get( $this->atts, 'fill', false );
		$this->atts['height'] = sb_chart_block_array_get( $this->atts, 'height', null );
		$this->atts['beginYAxisAt0'] = sb_chart_block_array_get( $this->atts, 'beginYAxisAt0', 0 );
		$this->atts['indexAxis'] = sb_chart_block_array_get( $this->atts, 'indexAxis', 'x' );
		$this->atts['opacity'] = sb_chart_block_array_get( $this->atts, 'opacity', '0.8');
	}

	/**
	 * Validates the chart type to the values we support.
	 *
	 * @param string $type The requested chart type.
	 * @return string
	 */
	function validate_type( $type ) {
		$type = strtolower( $type );
		switch ( $type ) {
			case 'line':
			case 'bar':
			case 'pie':
				break;

			case 'horizontalbar':
				$type = 'bar';
				$this->atts['indexAxis'] = 'y';
				break;
			default:
				$type='line';
		}
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
			$content = html_entity_decode( $content );
			$content=str_replace( '<br />', '', $content );
			$lines  =explode( "\n", $content );
		} else {
			return "No content?";
		}
		$this->legend=array_shift( $lines );
		$this->lines = $lines;
		$this->transpose( $lines );
	}

	/**
	 * Returns the start div tag for the chart.
	 *
	 * @return string
	 */
	function get_div_start() {
		$html = '<div class="chartjs"';
		if ( $this->atts['height']) {
			$html.= ' style="position:relative; height:'. $this->atts['height'] . 'px;"';
		}
		$html .= '>';
		return $html;
	}

	/**
	 * Renders the HTML and script for the chart.
	 *
	 * @param $atts
	 * @param $content
	 *
	 * @return string
	 */
	function render_html( $atts, $content ) {
		$this->set_id();
		$html = $this->get_div_start();
		$html .= $this->get_canvas( $atts );
		$html .= "\r";
		$script = '';
		$script .= '<script type="text/javascript">';
		$script .= 'document.addEventListener( "DOMContentLoaded", function() {';
		$script .= $this->get_ctx();
		$script .= "\r";
		$script .= $this->get_data();
		$script .= "\r";
		$script .= $this->get_options();
		$script .= "\r";
		$script .= $this->get_newChart( $atts );
		$script .= '}, false );';
		$script.='</script>';
		$script = str_replace( "\r\r", "\r", $script );
		$html .= $script;
		$html .= '</div>';
		return $html;
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

	/**
	 * We have to be careful we don't get two "\r"s together!
	 * @return string
	 */
	function get_data() {
		$data = "var 		data = {";
		$data .= "labels:" . json_encode( $this->get_labels() ); //  ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		$data .= ',';
		$data .= "\r";
		$data .= "datasets:" . json_encode( $this->get_datasets() );
		$data .= "};";
		$data .= "\r";
		return $data;
	}

	function get_legend( $index ) {
		$legends = explode( ',', $this->legend );
		$legend = sb_chart_block_array_get( $legends, $index, 'undefined' );
		return $legend;
	}

	/**
	 * Returns the single background colour for the line/bar.
	 * Returns all the background colours for a pie chart.
	 * @param $index
	 *
	 * @return string
	 */
	function get_backgroundColor( $index ) {
		$backgroundColors = $this->get_backgroundColors( $this->atts['opacity'] );
		if( 'pie' === $this->atts['type']) {
			return $backgroundColors;
		}
		$choice = ($index-1) % count( $backgroundColors);
		$backgroundColor = $backgroundColors[ $choice ];
		return $backgroundColor;
	}

	/**
	 * These are the chart.js border colors.
	 *
	 * @param $index
	 *
	 * @return string
	 */
	function get_borderColor( $index ) {
		$borderColors = $this->get_backgroundColors( 1.0 );
		$choice = ($index-1) % count( $borderColors );
		$borderColor = $borderColors[ $choice ];
		return $borderColor;
	}

	/**
	 * Returns an array of background colours.
	 *
	 * @param $opacity
	 * @return mixed
	 */
	function get_backgroundColors( $opacity ) {
		$this->opacity = $opacity;
		$backgroundColors = $this->color_palettes->get_backgroundColors( $this->atts['theme'], $opacity );
		return $backgroundColors;
	}


	/**
	 *
	 * We want to return datasets like this.
	 *
	 * Q. Can it be done using json_encode?
	 * A. Yes
	 *
	 * [{
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
	 *          fill: true/false
			}] ";
	 */

	function get_datasets() {
		$datasets=[];

		for ( $index=1; $index < count( $this->series ); $index ++ ) {
			$dataset                 =new stdClass;
			$dataset->label          = $this->get_legend( $index );
			$dataset->data           =$this->series[ $index ];
			$dataset->backgroundColor= $this->get_backgroundColor( $index );
			if( 'pie' !== $this->atts['type']) {
				$dataset->borderColor=$this->get_borderColor( $index );
			}
			$dataset->borderWidth    = 1;
			$dataset->fill = $this->atts['fill'];
			$datasets[]        =$dataset;
		}
		return $datasets;
	}

	/**
	 * Returns the options.
	 *
	 * Option | Value | Purpose
	 * ------- | ----- | -----
	 * maintainAspectRatio | false |
	 * indexAxis | x or y | y for a horizontal bar chart
	 * scales.y.beginAtZero | true | Start the axis from 0
	 * scales.y.stacked | true/false | Show a stacked line / bar chart. https://www.chartjs.org/docs/latest/charts/line.html?h=stacked
	 * scales.x.stacked | true | Only if a stacked chart is required.
	 *
	 * @TODO
	 * Convert to using objects and json_encode.
	 *
	 * @return string
	 */
	function get_options() {
		$options_html='';
		$options_html="var	options = {";
		$options = '';
		$stacked = $this->atts['stacked'];
		$indexAxis = '"' . $this->atts['indexAxis'] . '"';
		$beginAt0 = $this->atts['beginYAxisAt0'];
		switch ( $this->atts['type'] ) {
			case 'line':
			case 'bar':
			case 'horizontalBar':
				$options ="
			maintainAspectRatio: false,
			indexAxis: $indexAxis,
			scales: {
				y: { stacked: $stacked,
					 beginAtZero: $beginAt0
					}";
				if ( $stacked ) {
					$options .= ",x: { stacked: true } ";
				}
				$options .= " 	} ";
				break;
			case 'pie':
				$options ="maintainAspectRatio: false,";
				break;
		}
		$options_html .= $options;
		$options_html .= "};";
		return $options_html;
	}

	function get_newChart() {
		$type = $this->atts['type'];
		return "var myLineChart = new Chart(ctx, { type: '$type', data: data, options: options });";
	}

	function load_color_palettes() {
		require_once __DIR__ . '/class-sb-chart-color-palettes.php';
		$this->color_palettes = new SB_Chart_Color_Palettes();
	}
}
