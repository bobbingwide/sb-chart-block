/**
 * JavaScript equivalent to the logic in class SB_chart_block for
 * getting backgroundColor and borderColor values.
 *
 * data:
 *   labels:
 *   datasets:
 *     { label:  data:}
 *     ...
 *
 *  Options is another thing.
 *
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */

//const _ = require( 'lodash' );
const colors = new Object( {} );

colors.Chart = ["rgba( 247, 141, 167, 0.2 )",
	'rgba(255, 99, 132, 0.2)',
	'rgba(54, 162, 235, 0.2)',
	'rgba(255, 206, 86, 0.2)',
	'rgba(75, 192, 192, 0.2)',
	'rgba(153, 102, 255, 0.2)',
	'rgba(255, 159, 64, 0.2)'
	];
colors.Gutenberg =	[ "#F78DA7" // pale-pink
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

/**
 * Also known as Chartist?
 * @type {string[]}
 */
colors.Tertiary = [
	'#F1E70D',
	'#E42426',
	'#2072B2',
	'#FDC70F',
	'#c31a7f',
	'#1D96BB',
	'#F28F1F',
	'#6E398D',
	'#0A905D',
	'#EC6224',
	'#424F9B',
	'#8CBD3F'
	];

colors.Visualizer = [
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

var colorMap = new Map();
colorMap.set( 'Chart', colors.Chart );
colorMap.set( 'Gutenberg', colors.Gutenberg );
colorMap.set( 'Tertiary', colors.Tertiary );
colorMap.set( 'Visualizer', colors.Visualizer );
console.log( colorMap);



/**
 * Returns the single background colour for the line/bar.
 * Returns all the background colours for a pie chart.
 * @param $index
 *
 * @return string
 */
function getBackgroundColor( i, theme) {
	/*
	$backgroundColors = $this->get_backgroundColors( 0.9 );
	if( 'pie' === $this->atts['type']) {
		return $backgroundColors;
	}
	$choice = ($index-1) % count( $backgroundColors);
	$backgroundColor = $backgroundColors[ $choice ];
	return $backgroundColor;

	 */
	const colors = colorMap.get( theme );
	var choice = (i-1) % colors.length;
	return colors[ choice ];

}


function getBorderColor( i, theme ) {
	return getBackgroundColor( i, theme );
}

/**
 * These are the chart.js border colors.
 *
 * @param $index
 *
 * @return string


export default function getBorderColor( $index ) {
	$borderColors = $this->get_backgroundColors( 1.0 );
	$choice = ($index-1) % count( $borderColors );
	$borderColor = $borderColors[ $choice ];
	return $borderColor;
}
 */

export { getBackgroundColor, getBorderColor };
//, getBorderColor;

