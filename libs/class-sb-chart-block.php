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
	 * @var array $yAxes List of Y axes to which the datasets are bound
	 */
	private $yAxes;

	/**
	 * @var bool
	 */
	private $hasMultipleYAxes;

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
		$this->yAxes = [];
		$this->hasMultipleYAxes = false;
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
	 * Sets $atts from passed attributes. Attempts to set atts which were converted to lower case when used in a shortcode.
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

		$this->atts['height'] = sb_chart_block_array_get( $this->atts, 'height', 0 );

		if ( !isset( $this->atts['yAxes'] ) ) {
			if ( isset( $this->atts['yaxes'] ) ) {
				$this->atts['yAxes'] = $this->atts['yaxes'];
			}
		}
		$this->atts['yAxes'] = sb_chart_block_array_get( $this->atts, 'yAxes', '' );

		if ( !isset( $this->atts['beginYAxisAt0'] ) && isset( $this->atts['beginyaxisat0'] ) ) {
			$this->atts['beginYAxisAt0'] = $this->atts['beginyaxisat0'];
		}
		$this->atts['beginYAxisAt0'] = sb_chart_block_array_get( $this->atts, 'beginYAxisAt0', false );
		$this->atts['beginYAxisAt0'] = $this->validate_bool( $this->atts['beginYAxisAt0'] );

		if ( !isset( $this->atts['indexAxis'] ) && isset( $this->atts['indexaxis'] ) ) {
			$this->atts['indexAxis'] = $this->atts['indexaxis'];
		}
		$this->atts['indexAxis'] = sb_chart_block_array_get( $this->atts, 'indexAxis', 'x' );

		$this->atts['opacity'] = sb_chart_block_array_get( $this->atts, 'opacity', 0.8 );

		//bw_trace2( $this->atts, "this atts", false );

		$this->atts['time'] = sb_chart_block_array_get( $this->atts, 'time', false );
		$this->atts['time'] = $this->validate_bool( $this->atts['time'] );

		if ( !isset( $this->atts['timeUnit'] ) && isset( $this->atts['timeunit'] ) ) {
			$this->atts['timeUnit'] = $this->atts['timeunit'];
		}
		$this->atts['timeUnit'] = sb_chart_block_array_get( $this->atts, 'timeUnit', 'hour' );
		$this->atts['timeUnit'] = $this->validate_timeunit( $this->atts['timeUnit'] );

		if ( !isset( $this->atts['barThickness'] ) && isset( $this->atts['barthickness'] ) ) {
			$this->atts['barThickness'] = $this->atts['barthickness'];
		}
		$this->atts['barThickness'] = sb_chart_block_array_get( $this->atts, 'barThickness', 0 );

		$this->atts['tension'] = sb_chart_block_array_get( $this->atts, 'tension', 0 );

		$this->atts['max'] = sb_chart_block_array_get( $this->atts, 'max', -PHP_FLOAT_MAX );

		if ( !isset( $this->atts['backgroundColors'] ) ) {
			if ( isset( $this->atts['backgroundcolors'] ) ) {
				$this->atts['backgroundColors'] = $this->atts['backgroundcolors'];
			}
			// For compatibility with previous versions:
			else if ( isset( $this->atts['backgroundColor'] ) ) {
				$this->atts['backgroundColors'] = $this->atts['backgroundColor'];
			} else if ( isset( $this->atts['backgroundcolor'] ) ) {
				$this->atts['backgroundColors'] = $this->atts['backgroundcolor'];
			}
		}
		$this->atts['backgroundColors'] = sb_chart_block_array_get( $this->atts, 'backgroundColors', '' );

		if ( !isset( $this->atts['borderColors'] ) ) {
			if ( isset( $this->atts['bordercolors'] ) ) {
				$this->atts['borderColors'] = $this->atts['bordercolors'];
			}
			// For compatibility with previous versions:
			else if ( isset( $this->atts['borderColor'] ) ) {
				$this->atts['borderColors'] = $this->atts['borderColor'];
			} else if ( isset( $this->atts['bordercolor'] ) ) {
				$this->atts['borderColors'] = $this->atts['bordercolor'];
			}
		}
		$this->atts['borderColors'] = sb_chart_block_array_get( $this->atts, 'borderColors', $this->atts['backgroundColors'] );

		if ( !isset( $this->atts['showLine'] ) && isset( $this->atts['showline'] ) ) {
			$this->atts['showLine'] = $this->atts['showline'];
		}
		$this->atts['showLine'] = sb_chart_block_array_get( $this->atts, 'showLine', true );
		$this->atts['showLine'] = $this->validate_bool( $this->atts['showLine'] );

		/** Following code relies on the newer logic for sb_chart_block_array_get()  */
		$this->atts['labelsFontSize'] = sb_chart_block_array_get( $this->atts, 'labelsFontSize', null );
		$this->atts['xTicksFontSize'] = sb_chart_block_array_get( $this->atts, 'xTicksFontSize', null );

	}

	/**
	 * Validate boolean attributes.
	 *
	 * @param mixed $value The value to validate.
	 * @return bool Returns true if $value equals 1, "1", true, "true", "on" and "yes". Returns false otherwise.
	 */
	function validate_bool( $value ) {
		if ( !defined( 'FILTER_VALIDATE_BOOL')) {
			define( 'FILTER_VALIDATE_BOOL', FILTER_VALIDATE_BOOLEAN);
		}
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
				$unit = 'hour';
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
			$content = html_entity_decode( $content );
			$content = str_replace(
				['<br />', '<p>', '</p>', '”', '”'],
				['',       '',    '',     '"', '"'],
				$content
			);

			$lines = preg_split( '/\s*(\r\n|\r|\n)+\s*/', trim ( $content ) );

			if ( count( $lines) < 2 ) {
				//return "No data to chart?";
			}
		} else {
			return "No content to chart?";
		}

		$legends = array_shift( $lines );
		$this->legends = sb_chart_block_get_csv( $legends );

		$nb_columns = count( $this->legends );
		$this->yAxes = sb_chart_block_get_csv( $this->atts['yAxes'], false, $nb_columns );
		for ( $i = 0; $i < $nb_columns; $i++ ) {
			if ( 'y' !== $this->yAxes[$i] && 'y1' !== $this->yAxes[$i] ) {
				$this->yAxes[$i] = 'y';
			} else if ( 'y1' === $this->yAxes[$i] ) {
				$this->hasMultipleYAxes = true;
			}
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
		$classes = 'chartjs';
		if ( '' !== $this->atts['class'] ) {
			$classes .= ' ' . $this->atts['class'];
		}
		$html = '<div class="' . $classes . '"';
		if ( $this->atts['height'] > 0 ) {
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
		return $this->series[0] ?? '';
	}

	/**
	 * Transposes the input CSV into the series array.
	 *
	 * $series[0] will be the labels for the x-axis - along the bottom
	 *
	 * @param $lines
	 * @return array
	 */
	function transpose( $lines ) {
		$this->series = [];
		$nb_columns = count( $this->legends );
		foreach ( $lines as $line ) {
			$values = sb_chart_block_get_csv( $line, true, $nb_columns, null );
			foreach ( $values as $key => $value ) {
				if ( null === $value || 0 === strlen( trim( $value ) ) ){
					$this->series[ $key ][]= null;
				} else {
					$this->series[ $key ][] = trim( $value );
				}
			}

		}
		//bw_trace2( $this->series, "series" );
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

	function get_yAxisID( $datasetIndex ) {
		$index = $datasetIndex - 1;
		return isset( $this->yAxes[$index] ) ? $this->yAxes[$index] : 'y';
	}

	/**
	 * Returns the single background color for the line/bar.
	 * Returns all the background colors for a pie chart.
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
	 * Returns the single border color for the line/bar.
	 *
	 * @param $index
	 *
	 * @return string
	 */
	function get_borderColor( $index ) {
		$borderColors = $this->get_borderColors( 1.0 );
		$choice = ($index-1) % count( $borderColors );
		$borderColor = $borderColors[ $choice ];
		return $borderColor;
	}

	/**
	 * Returns an array of background colors. Missing colors from the `backgroundColors` shortcode attribute are taken from the theme colors.
	 *
	 * @param $opacity
	 * @return mixed
	 */
	function get_backgroundColors( $opacity ) {
		$this->opacity = $opacity;
		$customColors = [];
		if ( '' !== $this->atts['backgroundColors'] ) {
			$customColors = sb_chart_block_get_csv( $this->atts['backgroundColors'] );
			foreach ( $customColors as $key => $color ) {
				if ( '' !== $color ) {
					$customColors[$key] = $this->color_palettes->rgba( $color, $opacity );
				}
			}
		}
		$themeColors = $this->color_palettes->get_backgroundColors( $this->atts['theme'], $opacity );
		$backgroundColors = sb_chart_block_array_replace( $themeColors, $customColors );
		return $backgroundColors;
	}

	/**
	 * Returns an array of border colors. Missing colors from the `borderColors` shortcode attribute are taken from the background colors.
	 *
	 * @param $opacity
	 * @return mixed
	 */
	function get_borderColors( $opacity ) {
		$this->opacity = $opacity;
		$customColors = [];
		if ( '' !== $this->atts['borderColors'] ) {
			$customColors = sb_chart_block_get_csv( $this->atts['borderColors'] );
			foreach ( $customColors as $key => $color ) {
				if ( '' !== $color ) {
					$customColors[$key] = $this->color_palettes->rgba( $color, $opacity );
				}
			}
		}
		$themeColors = $this->get_backgroundColors( $opacity );
		$borderColors = sb_chart_block_array_replace( $themeColors, $customColors );
		return $borderColors;
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
			$dataset->backgroundColor = $this->get_backgroundColor($index);
			if( 'pie' !== $this->atts['type'] ) {
				$dataset->borderColor  = $this->get_borderColor( $index );
			}
			$dataset->borderWidth    = 1;
			if ( $this->atts['barThickness'] > 0 ) {
				$dataset->barThickness = $this->atts['barThickness'];
			}
			$dataset->fill = $this->atts['fill'];
			$dataset->tension = $this->atts['tension'];
			$dataset->showLine = $this->atts['showLine'];
			$dataset->yAxisID = $this->get_yAxisID( $index );
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
					'x' => $this->axis_options( 'x' ),
					'y' => $this->axis_options( 'y' ),
				];
				if ( $this->hasMultipleYAxes ) {
					$options->scales->y1 = $this->axis_options( 'y1' );
				}
				break;

			case 'pie':
				$options->maintainAspectRatio = false;
				break;
		}

		if ( null !== $this->atts['labelsFontSize' ] ) {
			$options->plugins=(object) [ 'legend'=>[ 'labels'=>[ 'font'=>[ 'size'=>$this->atts['labelsFontSize'] ] ] ] ];
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

		if ( 'y' === $axis || 'y1' === $axis ) {
			$options->beginAtZero = $this->atts['beginYAxisAt0'];

			if ( $this->atts['max'] > -PHP_FLOAT_MAX ) {
				$options->max = $this->atts['max'];
			}

			switch ($axis) {
				case 'y1':
					$options->position = 'right';
					break;

				default:
				$options->position = 'left';
					break;
			}
		}

		$options->stacked = $this->atts['stacked'];

		if ( $this->atts['time'] ) {
			$options = sb_chart_block_merge_objects( $options, $this->axis_time_options( $axis ), $options );
		}

		if ( 'x' === $axis ) {
			if ( null !== $this->atts['xTicksFontSize']) {
				$options->ticks=(object) [ 'font'=>[ 'size'=>$this->atts['xTicksFontSize'] ] ];
			}
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
				'unit' => $this->atts['timeUnit'],
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
