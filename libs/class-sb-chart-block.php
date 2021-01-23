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
		$atts['theme'] = isset( $atts['theme'] ) ? $atts['theme'] : 'Gutenberg';

		// Rather than use false, we use 0, otherwise the value doesn't come out
		// when converted to as a literal string.
		// It's different when we use json _decode()!
		$atts['stacked'] = isset( $atts['stacked'] ) ? $atts['stacked'] : 0;
		$atts['fill'] = sb_chart_block_array_get( $atts, 'fill', false );
		$atts['height'] = sb_chart_block_array_get( $atts, 'height', null );
		$atts['beginYAxisAt0'] = sb_chart_block_array_get( $atts, 'beginYAxisAt0', 0 );

		$this->atts = $atts;
	}

	/**
	 * Validates the chart type to the values we support.
	 *
	 * Note: In Chartist the type had an uppercase first letter.
	 * In Chart.js it's all lowercase... except for horizontalBar !
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
				$type = 'horizontalBar';
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
		//$legend = $lines[0];

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
		//echo "h";
		//echo $this->atts['height'];
		//echo 't';
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
		//$script .= 'function runmychart() {';
		$script .= $this->get_ctx();
		$script .= "\r";
		$script .= $this->get_data();
		$script .= "\r";
		$script .= $this->get_options();
		$script .= "\r";
		$script .= $this->get_newChart( $atts );
		//$script .= '}';
		//$script .= 'runmychart();';
		$script.='</script>';
		$script = str_replace( "\r\r", "\r", $script );
		$html .= $script;
		$html .= '</div>';


		//"chartjs-script",

		//$enqueued = wp_add_inline_script( 'chartjs-script', $script );
		//if ( !$enqueued ) {
		//	gob();
		//} else {
		//	$html .= '<p>script was enqueued!</p>';
		//}
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
		$backgroundColors = $this->get_backgroundColors( 0.9 );
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
	 * Returns the backgroundColors used by Chart.js
	 *
	 * @return string[]
	 */

	function get_Chart_backgroundColors() {
		$backgroundColors = [
			'rgba(255, 99, 132, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(255, 206, 86, 0.2)',
			'rgba(75, 192, 192, 0.2)',
			'rgba(153, 102, 255, 0.2)',
			'rgba(255, 159, 64, 0.2)'
		];
		return $backgroundColors;
	}

	function rgba( $hex, $opacity ) {
		$red = hexdec( substr( $hex, 1,2 ));
		$green = hexdec( substr( $hex, 3, 2 ));
		$blue = hexdec( substr( $hex, 5, 2 ));
		$rgba = "rgba( $red, $green, $blue, $opacity )";
		return $rgba;
	}

	function rgbas( $hexes, $opacity ) {
		$rgbas = [];
		foreach ( $hexes as $hex ) {
			$rgbas[] = $this->rgba( $hex, $opacity);
		}
		return $rgbas;
	}

	/**
	 * Returns the standard Tertiary colors
	 * @return string[]
	 */
	function get_Tertiary_backgroundColors() {
		$backgroundColors = [
			'#F1E70D', '#E42426', '#2072B2', '#FDC70F', '#C31A7F', '#1D96BB', '#F28F1F', '#6E398D', '#0A905D', '#EC6224', '#424F9B', '#8CBD3F'
		];
		$rgbas = $this->rgbas( $backgroundColors, $this->opacity );
		return $rgbas;
	}

	/**
	 * Returns colours from the current Gutenberg colour palette.
	 * How do we get this dynamically?
	 */
	function get_Gutenberg_backgroundColors() {
		$backgroundColors = [ "#F78DA7" // pale-pink
		, "#CF2E2E" // vivid-red
		, "#FF6900" // luminous-vivid-orange
		, "#FCB900" // luminous-vivid-amber
		, "#7BDCB5" // light-green-cyan
		, "#00D084" // vivid-green-cyan
		, "#8ED1FC" // pale-cyan-blue
		, "#0693E3" // vivid-cyan-blue
		, "#9B51E0" // vivid-purple
		, "#EEEEEE" // very-light-gray
		, "#ABB8C3" // cyan-bluish-gray
		, "#313131" // very-dark-gray
		, '#FFFFFF' // white
		];
		$rgbas = $this->rgbas( $backgroundColors, $this->opacity );
		return $rgbas;
	}

	function get_backgroundColors( $opacity ) {
		$this->opacity = $opacity;
		switch ( $this->atts['theme'] ) {
			case 'Chart':
				$backgroundColors = $this->get_Chart_backgroundColors();
				break;

			case 'Visualizer':
				$backgroundColors = $this->get_Visualizer_backgroundColors();
				break;

			case 'Chartist':
			case 'Tertiary':
				$backgroundColors = $this->get_Tertiary_backgroundColors();
				break;

			default:
				$backgroundColors = $this->get_Gutenberg_backgroundColors();

		}
		return $backgroundColors;
	}

	/**
	 * Returns Visualizer's background colours.
	 *
	 * @param $index
	 *
	 * @return string
	 */
	function get_Visualizer_backgroundColors() {
		$backgroundColors=[
			'#3366CC',
			'#DC3912',
			'#FF9900',
			'#109618',
			'#990099',
			'#0099C6',
			'#DD4477',
			'#66AA00',
			'#B82E2E',
			'#316395',
			'#994499',
			'#22AA99',
			'#AAAA11',
			'#6633CC'
		];
		$rgbas = $this->rgbas( $backgroundColors, $this->opacity );
		return $rgbas;
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
	 * scales.yAxes.ticks.beginAtZero | true | Start the axis from 0
	 * scales.yAxes.stacked | true | Show a stacked line / bar chart. https://www.chartjs.org/docs/latest/charts/line.html?h=stacked
	 *
	 * @TODO
	 * Convert to using objects and json_encode.
	 *
	 *
	 *
	 * @return string
	 */
	function get_options() {
		$options_html='';
		$options_html="var	options = {";
		$options = '';
		$stacked = $this->atts['stacked'];
		//echo "Stacked:" . $stacked . '!';
		$beginAt0 = $this->atts['beginYAxisAt0'];
		switch ( $this->atts['type'] ) {
			case 'line':
			case 'bar':
			case 'horizontalBar':
				$options ="
			maintainAspectRatio: false,
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: $beginAt0
					},
					 stacked: $stacked,
					}]";
				if ( $stacked ) {
					$options .= ",xAxes: [{ stacked: true }] ";
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

}
