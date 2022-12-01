<?php // (C) Copyright Bobbing Wide 2022
/**
 * @group sb-chart-block
 */
class Test_chart_block extends BW_UnitTestCase {

	function test_example_chart() {
		$attributes = ["type" => "pie",
			"content" => "Label,Value\nOne,1\nTwo,2\nThree,3",
			"myChartId" => "myChartExample"];

		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		/*
		$html = str_replace( "\r", "\n", $html );
		$html = str_replace( "\t", " ", $html );
		$html = str_replace( ',"', ',' . "\n" . '"', $html );
		$html .= $this->print_scripts();
		*/
		//$this->generate_expected_file($html);

		$this->assertArrayEqualsFile($html);
	}

	/**
	 * <!-- wp:oik-sb/chart {"content":"Date,Line 1,Line 2\n01-Jan,1,1\n02-Jan,1.1,1.2\n03-Jan,1.2,1.4\n04-Jan,1,3",
	 * "theme":"Rainbow","myChartId":"myChart-1","height":250,"className":"chartjs"} -->
	<div class="wp-block-oik-sb-chart chartjs"><div class="chartjs" style="height:250px"><canvas id="myChart-1"></canvas></div></div>
	<!-- /wp:oik-sb/chart -->
	 * @return void
	 */
	function test_line_chart() {
		$attributes = ["content" => "Date,Line 1,Line 2\n01-Jan,1,1\n02-Jan,1.1,1.2\n03-Jan,1.2,1.4\n04-Jan,1,3",
			"theme" => "Rainbow",
			"myChartId" => "myChart-1",
			"height" => 250
		];
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);

		$this->assertArrayEqualsFile($html);

	}

	/**
	 * Test the bar chart
	 * <!-- wp:oik-sb/chart {"type":"bar",
	 * "content":"Date,Line 1,Line 2\n2022-01-01,1,1\n2022-02-01,1.1,1.2\n2022-03-01,1.2,1.4\n2022-04-01,1,3",
	 * "theme":"Visualizer","myChartId":"myChart-3","stacked":true,"height":250,"beginYAxisAt0":true,"time":true,"timeunit":"month"} -->
	 * <div class="wp-block-oik-sb-chart"><div class="chartjs" style="height:250px"><canvas id="myChart-3"></canvas></div></div>
     */
	function test_bar_chart() {
		$attributes = ["type" => "bar",
			"content" => "Date,Line 1,Line 2\n2022-01-01,1,1\n2022-02-01,1.1,1.2\n2022-03-01,1.2,1.4\n2022-04-01,1,3",
			"theme" => "Visualizer",
			"myChartId" => "myChart-3",
			"stacked" => true,
			"height" => 250,
			"beginYAxisAt0" => true,
			"time" => true,
			"timeunit" => "month"
		];
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);

		$this->assertArrayEqualsFile($html);


	}

	/**
	 * Tests the horizontal bar chart
	 * {"type":"horizontalBar","content":"Label,Value\nOne,1\nTwo,2\nThree,3\nFour,4","myChartId":"myChart-5","stacked":true,"height":191,"className":"chartjs"} -->
	 * @return void
	 */
	function test_horizontal_bar_chart() {
		$attributes = [ "type" => "horizontalBar",
			"content" => "Label,Value\nOne,1\nTwo,2\nThree,3\nFour,4",
			"myChartId" => "myChart-5",
			"stacked" => true,
			"height" => 191
			];
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);

		$this->assertArrayEqualsFile($html);
	}

	/*
	 * <!-- wp:oik-sb/chart {"content":"Variations,Count,Accum\n2021-01,1,1\n2021-02,6,7\n2021-03,2,9\n2021-04,5,14",
	 * "myChartId":"myChart-1","height":250,"time":true,"timeunit":"month","tension":0.3} -->
	 */
	function test_line_chart_screenshot() {
		$attributes = [ "content" => "Variations,Count,Accum\n2021-01,1,1\n2021-02,6,7\n2021-03,2,9\n2021-04,5,14",
		 "height"=> 250, "time" => true, "timeunit"=> "month", "tension" => 0.3 ];
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);
		$this->assertArrayEqualsFile($html);
	}

	/*
	 * {"type":"horizontalBar","content":"Variations,Count,Accum\n2021-01,1,1\n2021-02,6,7\n2021-03,2,9\n2021-04,5,14",
	 * "theme":"Tertiary","myChartId":"myChart-27","height":250,"time":true,"timeunit":"month"}
	 */

	function test_horizontal_bar_screenshot() {
		$attributes = [ "type" => "horizontalBar",
			"content" => "Variations,Count,Accum\n2021-01,1,1\n2021-02,6,7\n2021-03,2,9\n2021-04,5,14",
			"theme" => "Tertiary","myChartId" => "myChart-27","height" => 250,"time" => true,"timeunit" => "month"];
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);
		$this->assertArrayEqualsFile($html);

	}

	/**
	 * {"type":"bar","content":"Variations,Count,Accum\n2021-01,1,1\n2021-02,6,7\n2021-03,2,9\n2021-04,5,14",
	 * "theme":"Gutenberg","myChartId":"myChart-29","height":250,"opacity":0.3,"time":true,"timeunit":"month"}
	 * @return void
	 */
	function test_bar_screenshot() {
		$attributes = [ "type" => "bar",
				"content" => "Variations,Count,Accum\n2021-01,1,1\n2021-02,6,7\n2021-03,2,9\n2021-04,5,14",
				"theme" => "Gutenberg","myChartId" => "myChart-29","height" => 250,"opacity" => 0.3,"time" => true,"timeunit" => "month"
			];
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);
		$this->assertArrayEqualsFile($html);
	}

	/*
	 * {"type":"pie","content":"Variations,Count,Accum\n2021-01,1\n2021-02,6\n2021-03,2\n2021-04,5",
	 * "theme":"Visualizer","myChartId":"myChart-31","height":250,"time":true,"timeunit":"year","tension":0.3}
	 *
	 * Note: Pie charts ignore timeline and tension attributes
	 */
	function test_pie_screenshot() {
		$attributes = [ "type" => "pie",
			"content" => "Variations,Count,Accum\n2021-01,1\n2021-02,6\n2021-03,2\n2021-04,5",
			"theme" => "Visualizer","myChartId" => "myChart-31","height" => 250,"time" => true,"timeunit" => "year","tension" => 0.3
		];
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);
		$this->assertArrayEqualsFile($html);
	}

	/**
	 * Prints the ChartJS CDN scripts.
	 *
	 * Enable the generated HTML file to be tested with the latest chart.js
	 *
	 * @return string
	 */
	function print_scripts() {
		$html = '<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>';
		$html .= '<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script>';
		return $html;
	}

	function prepare_expected_file( $html ) {
		$html = str_replace( "\r", "\n", $html );
		$html = str_replace( "\t", " ", $html );
		$html = str_replace( ',"', ',' . "\n" . '"', $html );
		$html .= $this->print_scripts();
		return $html;

	}
}

