<?php
/**
 * Plugin Name:     SB Chart block
 * Plugin URI: 		https://www.oik-plugins.com/oik-plugins/sb-chart-block
 * Description:     Displays a Chart for CSV content
 * Version:         1.1.0
 * Author:          bobbingwide
 * Author URI: 		https://www.bobbingwide.com/about-bobbing-wide
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     sb-chart-block
 *
 * @package         sb-chart-block
 */
function sb_chart_loaded() {
	add_action( 'init', 'sb_chart_block_block_init' );
	add_shortcode( 'chartjs', 'sb_chart_block_shortcode' );
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes it also registers all assets, so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function sb_chart_block_block_init() {
	if ( is_admin() ) {
		sb_chart_block_register_editor_script();
	}
	add_filter( 'block_type_metadata', 'sb_chart_block_block_type_metadata' );
	load_plugin_textdomain( 'sb-chart-block', false, 'sb-chart-block/languages' );
	$args = [ 'render_callback' => 'sb_chart_block_dynamic_block'];
	$registered = register_block_type_from_metadata( __DIR__ , $args );
	//bw_trace2( $registered );

	/**
	 * Localise the script by loading the required strings for the build/index.js file
	 * from the locale specific .json file in the languages folder.
	 */
	$ok = wp_set_script_translations( 'oik-sb-chart-editor-script', 'sb-chart-block' , __DIR__ .'/languages' );

}

/**
 * Implements block_type_metadata filter.
 *
 * @param $metadata
 *
 * @return mixed
 */
function sb_chart_block_block_type_metadata( $metadata ) {
	//bw_trace2();
	return $metadata;
}

/**
 * Registers the block editor script manually.
 *
 * If the `editorScript` property was set to a file name in block.json, register_block_type_from_metadata() would normally register the `editorScript` automatically.
 * But since we need to add the additional dependency on chartjs-script, we register this script manually, using logic similar to that in register_block_script_handle()
 * and set the entry in block.json to the script handle.
 */
function sb_chart_block_register_editor_script() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		_doing_it_wrong(
			__FUNCTION__,
			__( 'The asset file ( build/index.asset.php ) is missing.', 'sb-chart-block' ),
			'1.0.0'
		);
		return false;
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	//bw_trace2( $script_asset );
	if ( is_admin() ) {
		sb_chart_block_register_scripts();
		$script_asset['dependencies'][] = 'chartjs-script';
	}

	wp_register_script(
		'oik-sb-chart-editor-script',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
}

/**
 * Displays a chart.
 *
 * @param $attributes
 * @return string|void
 */
function sb_chart_block_dynamic_block( $attributes ) {
	//load_plugin_textdomain( 'sb-chart-block', false, 'sb-chart-block/languages' );
	$className = isset( $attributes['className']) ? $attributes['className'] : 'wp-block-oik-sb-chart';
	$content = isset( $attributes['content'] ) ? $attributes['content'] : null;
	$html = '<div class="'. $className . '">';
	$html .= sb_chart_block_shortcode( $attributes, $content, 'chartjs' );
	$html .= '</div>';
	return $html;
}

/**
 * Returns the array index or default.
 *
 * @param $array
 * @param $index
 * @param null $default
 *
 * @return mixed|null
 */
function sb_chart_block_array_get( $array, $index, $default=null ) {
	if ( isset( $array ) ) {
		if ( isset( $array[ $index ] ) ) {
			$value = $array[ $index ];
		} else {
			$value = $default;
		}
	} else {
		$value = $default;
	}
	return $value;
}

/**
 * Returns the two merged objects or default.
 *
 * @param $object
 * @param $object
 * @param null $default
 *
 * @return mixed|null
 */
function sb_chart_block_merge_objects( $object1, $object2, $default=null ) {
	$value = null;
	
	if ( is_object( $object1 ) && is_object( $object2 ) ) {
		$value = (object)array_merge((array)$object1, (array)$object2);
	} else {
		$value = $default;
	}
	
	return $value;
}

/**
 * Enqueues the chartjs script.
 */
function sb_chart_block_enqueue_scripts() {
	wp_enqueue_script( "chartjs-script" );
	// @TODO Make optional when using the time scale.
	wp_enqueue_script( 'chartjs-adapter-date-fns-script');
}

/**
 * Registers the chart.js script.
 *
 * WordPress plugins are not supposed to enqueue resources from 3rd parties.
 * Enqueue chart.js from a local version.
 * Since v3.0.0 chart.js file name is lower case.
 */
function sb_chart_block_register_scripts() {
	if ( defined( 'SCRIPT_DEBUG')  && SCRIPT_DEBUG  ) {
		$file = 'js/chart.js';
		$version = filemtime( __DIR__ . '/' . $file );
	} else {
		$file = 'js/chart.min.js';
		$version = null;
	}
	$file_url = plugin_dir_url( __FILE__ ) . $file;
	wp_register_script( "chartjs-script", $file_url, null, $version, true );

	if ( defined( 'SCRIPT_DEBUG')  && SCRIPT_DEBUG  ) {
		$file = 'js/chartjs-adapter-date-fns.bundle.min.js';
		$version = filemtime( __DIR__ . '/' . $file );
	} else {
		$file = 'js/chartjs-adapter-date-fns.bundle.min.js';
		$version = null;
	}
	$file_url = plugin_dir_url( __FILE__ ) . $file;
	wp_register_script( "chartjs-adapter-date-fns-script", $file_url, null, $version, true );

}

/**
 * Enqueues styles - if needed.
 */
function sb_chart_enqueue_styles() {
}

/**
 * Implements [chartjs] shortcode.
 *
 * @param array $atts Attributes for the Chart
 * @param string $content Content of the chart's data in CSV format.
 * @param string $tag The shortcode.
 * @return string
 */
function sb_chart_block_shortcode( $atts, $content, $tag ) {
	// This logic attempts to set atts which were converted to lower case when used in a shortcode.
	// Only set beginyaxisat0 to true when it's needed.
	$beginyaxisat0 = sb_chart_block_array_get(  $atts, 'beginyaxisat0', null );
	if ( null !== $beginyaxisat0 ) {
		$beginyaxisat0 = ( 'true' === $beginyaxisat0 ) ? true : false;
	    $atts['beginYAxisAt0'] = sb_chart_block_array_get(  $atts, 'beginYaxisAt0', $beginyaxisat0 );
	}
	$barthickness =  sb_chart_block_array_get(  $atts, 'barthickness', null );
	if ( null !== $barthickness ) {
		$atts['barThickness'] = sb_chart_block_array_get( $atts, 'barThickness', $barthickness );
	}
	if ( $content ) {
		require_once __DIR__ . '/libs/class-sb-chart-block.php';
		$sb_chart_block = new SB_Chart_Block();
		$html = $sb_chart_block->render( $atts, $content );
		return $html;
	}
	return '';
}

sb_chart_loaded();
