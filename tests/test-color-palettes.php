<?php // (C) Copyright Bobbing Wide 2021
/**
 * @group sb-chart-block
 */
class Test_color_palettes extends BW_UnitTestCase {

	function test_construct() {
		oik_require( 'libs/class-sb-chart-color-palettes.php', 'sb-chart-block' );
		$color_palettes = new SB_Chart_Color_Palettes();
		$this->assertInstanceOf( 'SB_Chart_Color_Palettes', $color_palettes );
	}

	function test_get_default() {
		$color_palettes = new SB_Chart_Color_Palettes();
		$default = $color_palettes->get_default();
		$this->assertEquals( 'Chart', $default );
	}

	function test_validate_theme() {

		$color_palettes = new SB_Chart_Color_Palettes();
		$themes = [ 'Gutenberg' => 'Gutenberg',
					'Chart' => 'Chart',
					'Visualizer' => 'Visualizer',
					'Tertiary' => 'Tertiary',
					'WordPress' => 'WordPress',
					'Rainbow' => 'Rainbow',
					'somethingelse' => 'Chart'
				];
		foreach ( $themes as $theme => $expected  ) {
			$actual = $color_palettes->validate_theme($theme);
			$this->assertEquals( $expected, $actual );
		}
	}

	function test_rgba() {
		$color_palettes = new SB_Chart_Color_Palettes();
		$rgba = $color_palettes->rgba( '#F78DA7', 0.2 );
		//echo $rgba;

		$expected = "rgba( 247, 141, 167, 0.2 )";
		$this->assertEquals( $expected, $rgba );
	}

	function expectedChart() {
		$chartArray =
		[  	'rgba( 255, 99, 132, 0.2 )',
			'rgba( 54, 162, 235, 0.2 )',
			'rgba( 255, 206, 86, 0.2 )',
			'rgba( 247, 141, 167, 0.2 )',
			'rgba( 75, 192, 192, 0.2 )',
			'rgba( 153, 102, 255, 0.2 )',
			'rgba( 255, 159, 64, 0.2 )',
			'rgba( 34, 113, 177, 0.2 )',
			'rgba( 100, 105, 112, 0.2 )',
			'rgba( 214, 54, 56, 0.2 )',
		    'rgba( 150, 128, 0, 0.2 )',
		    'rgba( 0, 138, 32, 0.2 )'
		];
		return $chartArray;
	}

	function test_get_backgroundColors() {
		$color_palettes = new SB_Chart_Color_Palettes();
		$backgroundColors = $color_palettes->get_backgroundColors( 'Chart', 0.2 );
		$this->assertIsArray( $backgroundColors );
		$this->assertCount( 12, $backgroundColors );

		$this->assertEquals( $this->expectedChart(), $backgroundColors );
	}

}
