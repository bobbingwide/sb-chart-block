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
//const palettes  = require( '../../palettes.json' );
/**
 * The different color palettes are defined in palettes.json.
 * This is dynamically loaded for server rendering but is statically loaded in the JavaScript.
 * Each Palette is an array of objects, where each object can be
 * `{ "color": "#RRGGBB", "slug":"intended-to-describe-the-color" }`
 *
 * To return the array of colors we just need the color attribute.
 *
 * @TODO Return the set of palette names from the top level object properties.
 * This is the "theme". Currently not translatable.
 *
 * @TODO We also need to be able to convert the colors from hex to rgba() applying the user defined opacity.
 *
 */
import palettes from '../../palettes.json';
console.log( "Palettes");
console.log( palettes );
console.log( "ap");

//const _ = require( 'lodash' );
const colors = new Object( {} );

colors.Chart = [
	"#f78da7",
	"#ff6384",
	"#36a2eb",
	"#ffce56",
	"#4BC0C0",
	"#9966CD",
	"#FF9F40"
];
/*
colors.Chart = ["rgba( 247, 141, 167, 0.2 )",
	'rgba(255, 99, 132, 0.2)',
	'rgba(54, 162, 235, 0.2)',
	'rgba(255, 206, 86, 0.2)',
	'rgba(75, 192, 192, 0.2)',
	'rgba(153, 102, 255, 0.2)',
	'rgba(255, 159, 64, 0.2)'
	];

 */
colors.Gutenberg =	[ "#F78DA7" // pale-pink
			, "#CF2E2E" // vivid-red
			, "#FF6900" // luminous-vivid-orange
			, "#FCB900" // luminous-vivid-amber
			, "#7BDCB5" // light-green-cyan
			, "#00D084" // vivid-green-cyan
			, "#8ED1FC" // pale-cyan-blue
			, "#0693E3" // vivid-cyan-blue
			, "#9B51E0" // vivid-purple
			, "#ABB8C3" // cyan-bluish-gray
			, "#313131" // very-dark-gray
	, "#EEEE00" // yellowish grey
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
 * Returns all the background colours for a pie chart.
 *
 * @param theme
 * @returns array of colors
 */
function getBackgroundColors( theme ) {
	// What if the theme is not present?
	const palette = palettes[theme];
	//console.log( palette);
	const colors = palette.map( item => {
		//console.log( item );
		// What if the color attribute is not present?
		return item.color;
	} );
	//console.log( colors );
	return colors;
}

/**
 * Returns a single background color for the line/bar.
 *
 * @param i
 * @param theme
 * @returns string
 */
function getBackgroundColor( i, theme) {
	const colors = getBackgroundColors( theme );
	var choice = (i-1) % colors.length;
	return colors[ choice ];
}

function getBorderColor( i, theme ) {
	return getBackgroundColor( i, theme );
}


function getThemes() {
	const themes = palettes.getOwnPropertyNames();
	return themes;
}

export { getBackgroundColors, getBackgroundColor, getBorderColor, getThemes };

