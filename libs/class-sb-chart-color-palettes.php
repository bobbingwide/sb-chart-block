<?php
/**
 * Class Color_Palettes
 * @copyright (C) Copyright Bobbing Wide 2021
 * @package sb-chart-block
 */
class Color_Palettes {

	private $palettes = null;
	private $background_colors = [];
	private $opacity = 1.0;

	function __construct() {
		$this->get_palettes();
	}

	/**
	 * Sets the palettes.
	 */
	function get_palettes()  {
		$json = file_get_contents( dirname( __DIR__ ) . '/palettes.json');
		//echo $json;
		$decoded = json_decode( $json, true );
		if ( null === $decoded ) {
			echo "Invalid palettes.json file";
		} else {
			$this->palettes = $decoded;
		}

	}

	function get_backgroundColor( $index ) {

	}

	function validate_theme( $theme ) {
		if ( !isset( $this->palettes[ $theme ])) {
			$theme = 'Gutenberg';
		}
		return $theme;
	}

	/**
	 * Maps the background colours into a unkeyed array, adding opacity
	 *
	 * @param $theme
	 * @param $opacity
	 */
	function get_backgroundColors( $theme, $opacity ) {
		$theme = $this->validate_theme( $theme );
		if ( 'Chart' === $theme ) {
			$opacity = 0.2;
		}
		$palette = $this->palettes[$theme];
		$this->background_colors = [];
		foreach ( $palette as $key => $color ) {
			$this->background_colors[] =  $this->rgba( $color['color'], $opacity);
		}
		return $this->background_colors;
	}

	function rgba( $hex, $opacity ) {
		$red = hexdec( substr( $hex, 1,2 ));
		$green = hexdec( substr( $hex, 3, 2 ));
		$blue = hexdec( substr( $hex, 5, 2 ));
		$rgba = "rgba( $red, $green, $blue, $opacity )";
		return $rgba;

	}
}
