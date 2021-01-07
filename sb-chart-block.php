<?php
/**
 * Plugin Name:     SB Chart block
 * Plugin URI: 		https://www.oik-plugins.com/oik-plugins/sb-chart-block
 * Description:     Displays CSV content as a Chart
 * Version:         0.0.0
 * Author:          bobbingwide
 * Author URI: 		https://www.bobbingwide.com/about-bobbing-wide
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     sb-chart-block
 *
 * @package         sb-chart-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function sb_chart_block_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "sb/chart-block" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'sb-chart-block-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	/*
	 * Localise the script by loading the required strings for the build/index.js file
	 * from the locale specific .json file in the languages folder
	 */
	$ok = wp_set_script_translations( 'sb-chart-block-block-editor', 'sb-chart-block' , $dir .'/languages' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'sb-chart-block-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'sb-chart-block-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'oik-sb/chart', array(
		'editor_script' => 'sb-chart-block-block-editor',
		'editor_style'  => 'sb-chart-block-block-editor',
		'style'         => 'sb-chart-block-block',
		'render_callback'=>'sb_chart_block_dynamic_block',
		'attributes' => [
			'type' => [ 'type' => 'string'],
			'className' => [ 'type' => 'string'],
		]
	) );
}
add_action( 'init', 'sb_chart_block_block_init' );

/**
 * Displays a chart
 *
 * @param $attributes
 * @return string|void
 */
function sb_chart_block_dynamic_block( $attributes ) {
	load_plugin_textdomain( 'sb-chart-block', false, 'sb-chart-block/languages' );
	$className = isset( $attributes['className']) ? $attributes['className'] : 'wp-block-oik-sb-chart';
	$html = '<ul class="'. $className . '">';
	$html .= sb_chart_block_html( $attributes );
	$html .= '</ul>';
	return $html;
}

function sb_chart_block_html( $attributes ) {
	$type = $attributes['type'];
	return "<li>$type chart  goes here </li>";
}
