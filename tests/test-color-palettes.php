<?php // (C) Copyright Bobbing Wide 2021
/**
 * @group sb-chart-block
 */
class Test_color_palettes extends BW_UnitTestCase {

	function test_construct() {
		oik_require( 'libs/class-color-palettes.php', 'sb-chart-block' );
		$color_palettes = new Color_Palettes();
		$this->assertInstanceOf( 'Color_Palettes', $color_palettes );

	}

}
