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
//console.log( "Palettes");
//console.log( palettes );
//console.log( "ap");

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

/**
 * Returns the theme options for the Select list.
 *
 * @returns {{label: T, value: T}[]}
 */

function getThemeOptions() {
	//console.log( palettes );
	const themes = Object.getOwnPropertyNames( palettes );
	const themeOptions = themes.map( theme => {
		//console.log(theme);
		var item = {value: theme, label: theme};
		return item;
	} );
	//console.log( themeOptions );
	return themeOptions;
}

export { getBackgroundColors, getBackgroundColor, getBorderColor, getThemeOptions };
