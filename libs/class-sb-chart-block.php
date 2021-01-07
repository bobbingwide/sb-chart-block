<?php

/**
 * @copyright (C) Bobbing Wide 2021
 * @package sb-chart-block
 *
 * Class SB_chart_block
 */

class SB_chart_block {


	/**
	 * SB_chart_block constructor.
	 */
	function __construct() {

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
		$html = $this->render_html( $atts, $content);
		return $html;
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

	function get_data() {
		return "var 		data = {
			labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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
