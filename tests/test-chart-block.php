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
	 * {"type":"pie","content":"Variations,Count\n2021-01,1\n2021-02,6\n2021-03,2\n2021-04,5",
	 * "theme":"Visualizer","myChartId":"myChart-31","height":250,"time":true,"timeunit":"year","tension":0.3}
	 *
	 * Note: Pie charts ignore timeline and tension attributes.
	 *
	 */
	function test_pie_screenshot() {
		$attributes = [ "type" => "pie",
			"content" => "Variations,Count\n2021-01,1\n2021-02,6\n2021-03,2\n2021-04,5",
			"theme" => "Visualizer","myChartId" => "myChart-31","height" => 250,"time" => true,"timeunit" => "year","tension" => 0.3
		];
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);
		$this->assertArrayEqualsFile($html);
	}

	/**
	 * {" {"content":"Month,Import,Export\nSep,14,6.142\nOct,16,35\nNov,11,8.142\nDec,13,17",
 * "theme":"Visualizer","myChartId":"myChart-1","fill":true,"opacity":0.6} -content":"Month,Import,Export\nSep,14,6.142\nOct,16,35\nNov,11,8.142\nDec,13,17","theme":"Visualizer","myChartId":"myChart-1","fill":true,"opacity":0.6} -
	 */
	function test_area_chart_line_with_fill() {
		$attributes = [ "content" => "Month,Import,Export\nSep,14,6.142\nOct,16,35\nNov,11,8.142\nDec,13,17",
				"theme" => "Visualizer","myChartId" => "myChart-1","fill" => true,"opacity" => 0.6
			];
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);
		$this->assertArrayEqualsFile($html);
	}


	/*
	 *  [chartjs type="bar" barThickness="25" theme="Visualizer" backgroundColors=",#FFFF00" borderColors="#0000FF,,#008000"]Year,Dataset1,Dataset2,Dataset3,Dataset4
    2018,50,25,32,45
    2019,32,45,22,19
    2020,25,49,35,23
    2021,42,31,43,35[/chartjs]
	 */
	function test_background_border_color_overrides() {
		$attributes = [ "type" => "bar",
			"barThickness" => "25",
			"theme" => "Visualizer",
			"backgroundColors" => ",#FFFF00",
			"borderColors" => "#0000FF,,#008000",
			"content" => "Year,Dataset1,Dataset2,Dataset3,Dataset4\n2018,50,25,32,45\n2019,32,45,22,19\n2020,25,49,35,23\n2021,42,31,43,35",
		];
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);
		$this->assertArrayEqualsFile($html);

	}

	/*
	<!-- wp:oik-sb/chart {"type":"bar",
	"content":"Year,Dataset1,Dataset2,Dataset3,Dataset4\n2018,50,25,32,45\n2019,32,45,22,19\n2020,25,49,35,23\n2021,42,31,43,35",
	"theme":"Visualizer","myChartId":"myChart-3","barThickness":25,"backgroundColors":",#FFFF00","borderColors":"#0000FF,,#008000"} -->
<div class="wp-block-oik-sb-chart"><div class="chartjs"><canvas id="myChart-3"></canvas></div></div>
<!-- /wp:oik-sb/chart -->
	*/
	function test_custom_colors() {
		$attributes = json_decode( '{"type":"bar",
	"content":"Year,Dataset1,Dataset2,Dataset3,Dataset4\n2018,50,25,32,45\n2019,32,45,22,19\n2020,25,49,35,23\n2021,42,31,43,35",
	"theme":"Visualizer","myChartId":"myChart-3","barThickness":25,"backgroundColors":",#FFFF00","borderColors":"#0000FF,,#008000"}', true );
		//print_r( $attributes );
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);
		$this->assertArrayEqualsFile($html);

	}

	/**
	 * <!-- wp:oik-sb/chart {"content":"Year,Dataset1,Dataset2,Dataset3\n2018,250\n2019,250, ,120\n    2020,,175,125\n 2021  ,220,125,75\n2022,230,215,90","myChartId":"myChart-1","height":250,"barThickness":1} -->
	<div class="wp-block-oik-sb-chart"><div class="chartjs" style="height:250px"><canvas id="myChart-1"></canvas></div></div>
	<!-- /wp:oik-sb/chart -->
	 */
	function test_partial_lines() {
		$attributes = json_decode( '{"content":"Year,Dataset1,Dataset2,Dataset3\n2018,250\n2019,250, ,120\n    2020,,175,125\n 2021  ,220,125,75\n2022,230,215,90","myChartId":"myChart-1","height":250,"barThickness":1}', true );
		//print_r( $attributes );
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);
		$this->assertArrayEqualsFile($html);

	}

	/**
	 * <!-- wp:oik-sb/chart {"content":"Year,\u0022Dataset 1: Lorem ipsum, dolor sit\u0022,\u0022Dataset 2: id dapibus, dui rhoncus\u0022\n    2017,9,12\n    2018,5,17\n    2019,10,15\n    2020,1,19\n    2021,14,22\n    2022,9,23","myChartId":"myChart-3"} -->
	 * @return void
	 */
	function test_commas_in_legends() {
		$attributes = json_decode( '{"content":"Year,\u0022Dataset 1: Lorem ipsum, dolor sit\u0022,\u0022Dataset 2: id dapibus, dui rhoncus\u0022\n    2017,9,12\n    2018,5,17\n    2019,10,15\n    2020,1,19\n    2021,14,22\n    2022,9,23","myChartId":"myChart-3"}', true );
		//print_r( $attributes );
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);
		$this->assertArrayEqualsFile($html);

	}

	/**
	 * <!-- wp:oik-sb/chart {"content":"Year,Sales,Expenses\n2020-08,5421.32,1151.21\n2021-02,4823.99,887.23\n2021-03,4945.32,958.00\n2021-10,7086.65,1854.35\n2022-05,7385.21,2009.01",
	 * "theme":"Visualizer","myChartId":"myChart-1","fill":true,"opacity":0.3,"time":true,"timeunit":"month",
	 * "tension":0.2,"backgroundColors":"#008000","yAxes":"y,y1"} -->
	 */
	function test_multiple_y_axis_scales() {
		$attributes = json_decode( '{"content":"Year,Sales,Expenses\n2020-08,5421.32,1151.21\n2021-02,4823.99,887.23\n2021-03,4945.32,958.00\n2021-10,7086.65,1854.35\n2022-05,7385.21,2009.01",
	  "theme":"Visualizer","myChartId":"myChart-1","fill":true,"opacity":0.3,"time":true,"timeunit":"month",
	  "tension":0.2,"backgroundColors":"#008000","yAxes":"y,y1"}', true );
		//print_r( $attributes );
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);
		$this->assertArrayEqualsFile($html);

	}

	/**
	 * Test multiple y-axes and label and x-tick font size
	 * @return void
	 */
	function test_y_axis_yyy_88() {
		$attributes = json_decode( '{"type":"bar","content":"Item,y,y,y\nA,1,30,50\nB,2,40,60\nC,3,50,70",
			"theme":"Gutenberg","myChartId":"myChart-1","height":250,"beginYAxisAt0":true,
			"labelsFontSize":8,"xTicksFontSize":8,"borderColors":"#999999"}', true );
		//print_r( $attributes );
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);
		$this->assertArrayEqualsFile($html);
	}

	/**
	 * Test multiple y-axes and label and x-tick font size
	 * @return void
	 */
	function test_y_axis_yy1y1_1010() {
		$attributes = json_decode( '{"type":"bar","content":"Item,y,y1,y1\nA,1,30,50\nB,2,40,60\nC,3,50,70",
			"theme":"Gutenberg","myChartId":"myChart-3","height":250,"beginYAxisAt0":true,
			"labelsFontSize":10,"xTicksFontSize":10,"borderColors":"#999999","yAxes":"y,y1,y1"} ', true );
		//print_r( $attributes );
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);
		$this->assertArrayEqualsFile($html);
	}

	/**
	 * Test multiple y-axes and label and x-tick font size
	 * @return void
	 */
	function test_y_axis_y1yy_1212() {
		$attributes = json_decode( '{"type":"bar","content":"Item,y1,y,y\nA,1,30,50\nB,2,40,60\nC,3,50,70",
		"theme":"Gutenberg","myChartId":"myChart-15","height":250,"beginYAxisAt0":true,"borderColors":"#999999","yAxes":"y1"}', true );
		//print_r( $attributes );
		$html = sb_chart_block_dynamic_block($attributes);
		$html = $this->prepare_expected_file( $html );
		//$this->generate_expected_file($html);
		$this->assertArrayEqualsFile($html);
	}

	/**
	 * Test multiple y-axes and label and x-tick font size
	 * @return void
	 */
	function test_y_axis_yy1y_1414() {
		$attributes = json_decode( '{"type":"bar","content":"Item,y,y1,y\nA,1,30,50\nB,2,40,60\nC,3,50,70",
		"theme":"Gutenberg","myChartId":"myChart-17","height":250,"beginYAxisAt0":true,"labelsFontSize":14,"xTicksFontSize":14,"borderColors":"#999999","yAxes":"y,y1,y"}', true );
		//print_r( $attributes );
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

