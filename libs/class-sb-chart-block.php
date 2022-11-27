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
	 * @var array $legends Legends for multiple lines or bars
	 */
	private $legends;

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
		$this->legends = [];
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
		$html = $this->prepare_content( $content );
		if ( null === $html) {
			$html = $this->render_html($atts, $content);
		}
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
		//print_r( $atts );
		if ( empty( $atts ) ) {
			$atts = [];
		}
		$this->atts = $atts;
		
		$this->atts['type'] = isset( $this->atts['type'] ) ? $this->atts['type'] : 'line';
		$this->atts['type'] = $this->validate_type( $this->atts['type'] );
		
		$this->atts['class'] = isset( $this->atts['class'] ) ? $this->atts['class'] : '';
		
		$this->atts['theme'] = isset( $this->atts['theme'] ) ? $this->atts['theme'] : $this->color_palettes->get_default();

		$this->atts['stacked'] = isset( $this->atts['stacked'] ) ? $this->atts['stacked'] : false;
		$this->atts['stacked'] = $this->validate_bool( $this->atts['stacked'] );
			
		$this->atts['fill'] = sb_chart_block_array_get( $this->atts, 'fill', false );
		$this->atts['fill'] = $this->validate_bool( $this->atts['fill'] );
			
		$this->atts['height'] = sb_chart_block_array_get( $this->atts, 'height', null );
		
		$this->atts['beginYAxisAt0'] = sb_chart_block_array_get( $this->atts, 'beginYAxisAt0', false );
		$this->atts['beginYAxisAt0'] = $this->validate_bool( $this->atts['beginYAxisAt0'] );
		
		$this->atts['indexAxis'] = sb_chart_block_array_get( $this->atts, 'indexAxis', 'x' );
		
		$this->atts['opacity'] = sb_chart_block_array_get( $this->atts, 'opacity', '0.8');
		
		//bw_trace2( $this->atts, "this atts", false );
		
		$this->atts['time'] = sb_chart_block_array_get( $this->atts, 'time', null );
		
		$this->atts['timeunit'] = sb_chart_block_array_get( $this->atts, 'timeunit', 'hour');
		$this->atts['timeunit'] = $this->validate_timeunit( $this->atts['timeunit'] );
		
		$this->atts['barThickness'] = sb_chart_block_array_get( $this->atts, 'barThickness', null );
		
		$this->atts['tension'] = sb_chart_block_array_get( $this->atts, 'tension', 0 );
		
		$this->atts['max'] = sb_chart_block_array_get( $this->atts, 'max', null );
		
		$this->atts['backgroundColor'] = sb_chart_block_array_get( $this->atts, 'backgroundColor', null );
		
		$this->atts['borderColor'] = sb_chart_block_array_get( $this->atts, 'borderColor', $this->atts['backgroundColor'] );
		
		$this->atts['showLine'] = sb_chart_block_array_get( $this->atts, 'showLine', true );
		$this->atts['showLine'] = $this->validate_bool( $this->atts['showLine'] );
	}
	
	/**
	 * Validate boolean attributes.
	 *
	 * @param mixed $value The value to validate.
	 * @return bool Returns true if $value equals 1, "1", true, "true", "on" and "yes". Returns false otherwise.
	 */
	function validate_bool( $value ) {
		return filter_var( $value, FILTER_VALIDATE_BOOL );
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
	 * Validates the time unit.
	 *
	 * Default hour
	 * See https://www.chartjs.org/docs/3.3.2/axes/cartesian/time.html#time-units
	 *
	 * @param $unit
	 */
	function validate_timeunit( $unit ) {
		$unit = strtolower( $unit );
		switch ( $unit ) {
			case 'year':
			case 'quarter':
			case 'month':
			case 'week':
			case 'day':
			case 'hour':
			case 'minute':
			case 'second':
			case 'millisecond':
				break;

			default:
				$unit = 'day';
		}
		return $unit;
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
		$content = apply_filters( 'sb_chart_block_content', $content, $this->atts );
		if ( $content ) {
			$content=trim( $content );
			$content = html_entity_decode( $content );
			$content=str_replace( '<br />', '', $content );
			$lines  =explode( "\n", $content );
			if ( count( $lines) < 2 ) {
				//return "No data to chart?";
			}
		} else {
			return "No content to chart?";
		}
		$legends = array_shift( $lines );
		if (is_string( $legends )) {
			$this->legends = explode( ',', $legends );
		}
		$this->lines = $lines;
		$this->transpose( $lines );
		return null;
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
		$legend = sb_chart_block_array_get( $this->legends, $index, 'undefined' );
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
			if ( $this->atts['backgroundColor']) {
				$dataset->backgroundColor = $this->atts['backgroundColor'];
			} else {
				$dataset->backgroundColor = $this->get_backgroundColor($index);
			}
			if( 'pie' !== $this->atts['type']) {
				if ( $this->atts['borderColor']) {
					$dataset->borderColor = $this->atts['borderColor'];
				} else {
					$dataset->borderColor = $this->get_borderColor($index);
				}
			}
			$dataset->borderWidth    = 1;
			if ( $this->atts['barThickness']) {
				$dataset->barThickness = $this->atts['barThickness'];
			}
			$dataset->fill = $this->atts['fill'];
			$dataset->tension = $this->atts['tension'];
			$dataset->showLine = $this->atts['showLine'];
			$datasets[]        =$dataset;
		}
		return $datasets;
	}

	/**
	 * Returns the options.
	 *
	 * Option | Value | Purpose
	 * ------ | ----- | -------
	 * maintainAspectRatio | false |
	 * indexAxis | x or y | y for a horizontal bar chart
	 * scales.y.beginAtZero | true | Start the axis from 0
	 * scales.y.stacked | true/false | Show a stacked line / bar chart. https://www.chartjs.org/docs/latest/charts/line.html?h=stacked
	 * scales.x.stacked | true | Only if a stacked chart is required.
	 *
	 * @return string
	 */
	function get_options() {
		$options = new stdClass();
		
		switch ( $this->atts['type'] ) {
			case 'line':
			case 'bar':
			case 'horizontalBar':
				$options->maintainAspectRatio = false;
				$options->indexAxis = $this->atts['indexAxis'];
				$options->scales = (object)[
					'y' => $this->axis_options( 'y' ),
					'x' => $this->axis_options( 'x' ),
				];
				break;
			
			case 'pie':
				$options->maintainAspectRatio = false;
				break;
		}
		
		$options = apply_filters( 'sb_chart_block_options', $options, $this->atts, $this->series );
		
		return 'var options = ' . json_encode( $options ) . ';';
	}

	/**
	 * Returns options for the specified axis.
	 *
	 * @param string $axis
	 * @return object
	 */
	function axis_options( $axis ) {
		$options = new stdClass();
		
		if ( substr( $axis, 0, 1 ) === 'y' ) {
			$options->beginAtZero = $this->atts['beginYAxisAt0'];
			
			if ( $this->atts['max'] ) {
				$options->max = $this->atts['max'];
			}
		}
		
		$options->stacked = $this->atts['stacked'];
		
		if ( $this->atts['time'] ) {
			$options = sb_chart_block_merge_objects( $options, $this->axis_time_options( $axis ), $options );
		}
		
		return $options;
	}
	
	/**
	 * Returns the axis options for time line.
	 *
	 * @param $axis
	 * @return object
	 */
	function axis_time_options( $axis ) {
		$options = new stdClass();
		
		if ( $axis === $this->atts['indexAxis'] ) {
			wp_enqueue_script( 'chartjs-adapter-date-fns-script' );
			$options->type = 'time';
			$options->time = (object)[
				'unit' => $this->atts['timeunit'],
				'displayFormats' => (object)[
					'minute' => 'dd MMM hh:mm',
					'hour' => 'dd MMM hh:mm',
					'day' => 'dd MMM',
				],
			];
		}
		
		return $options;
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
