<?php
/**
 * Plugin Name:     SB Chart block
 * Plugin URI: 		https://www.oik-plugins.com/oik-plugins/sb-chart-block
 * Description:     Displays CSV content as a Chart
 * Version:         0.0.3
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
	add_action( 'wp_enqueue_scripts', 'sb_chart_block_enqueue_scripts' );
	add_shortcode( 'chartjs', 'sb_chart_block_shortcode' );
	//add_action( 'wp_enqueue_block_editor_assets', 'sb_chart_block_register_scripts');
}

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
	//bw_trace2( $script_asset );
	sb_chart_block_register_scripts();
	$script_asset['dependencies'][] = 'chartjs-script';
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
		'script'    => 'chartjs-script',
		'render_callback'=>'sb_chart_block_dynamic_block',
		'attributes' => [
			'type' => [ 'type' => 'string'],
			'className' => [ 'type' => 'string'],
			'content' => ['type' => 'string'],
			'theme' => ['type' => 'string']
		]
	) );
}

/**
 * Displays a chart.
 *
 * @param $attributes
 * @return string|void
 */
function sb_chart_block_dynamic_block( $attributes ) {
	load_plugin_textdomain( 'sb-chart-block', false, 'sb-chart-block/languages' );
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
 * Displays the default chart.
 *
 * @param $attributes
 *
 * @return string
 */
function sb_chart_block_html( $attributes ) {
	//$type = sb_chart_block_array_get( $attributes, 'type', 'Line' );
	$html = file_get_contents( __DIR__ . '/tests/data/default-chart.html');
	return $html;
}

/**
 * https://cdnjs.com/libraries/Chart.js
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js" integrity="sha512-d9xgZrVZpmmQlfonhQUvTR7lMPtO7NkZMkA0ABN3PHCbKA5nqylQ/yWlFAyY6hYgdF1Qh6nYiuADWwKB4C2WSw==" crossorigin="anonymous"></script>
 *
 * https://www.jsdelivr.com/package/npm/chart.js?path=dist
 * <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
 */
function sb_chart_block_enqueue_scripts() {
	//bw_trace2();
	wp_enqueue_script( "chartjs-script", 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js' );
}

function sb_chart_block_register_scripts() {
	//bw_trace2();
	wp_register_script( "chartjs-script", 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js' );

}

/**
 * Enqueues styles - if needed.
 *
 * <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.css" integrity="sha512-C7hOmCgGzihKXzyPU/z4nv97W0d9bv4ALuuEbSf6hm93myico9qa0hv4dODThvCsqQUmKmLcJmlpRmCaApr83g==" crossorigin="anonymous" />
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
	$attrs = [];
	$attrs[ 'type'] = sb_chart_block_array_get( $atts, 'type', 'Line');
	if ( $content ) {
		require_once __DIR__ . '/libs/class-sb-chart-block.php';
		$sb_chart_block = new SB_Chart_Block();
		$html = $sb_chart_block->render( $atts, $content );
		return $html;
	}

	return sb_chart_block_html( $attrs );
}

sb_chart_loaded();
