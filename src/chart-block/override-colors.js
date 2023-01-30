/**
 * Override background and border colors using same logic as in the server side rendering.
 *
 * The backgroundColors and borderColors attributes represent a sparse array of overrides
 * to the chosen theme's colors.
 *
 *
 * | Color attributes     | Dataset1 | Dataset2 | Dataset3 | Dataset4 |
 * |----------------------|----------|----------|----------|----------|
 * | **backgroundColors** | empty    | #FFFF00  | empty    | empty    |
 * | **borderColors**     | #0000FF  | empty    | #008000  | empty    |
 *
 * The chart will be rendered as follows:
 *
 * | Color attributes     | Dataset1      | Dataset2                    | Dataset3      | Dataset4      |
 * |----------------------|---------------|-----------------------------|---------------|---------------|
 * | **backgroundColors** | Theme color 1 | #FFFF00                     | Theme color 3 | Theme color 4 |
 * | **borderColors**     | #0000FF       | background color (#FFFF00)  | #008000       | Theme color 4 |
 *
 *
 */
import { getBackgroundColors, rgba } from './theme-colors';

function getbackgroundColorsArray( backgroundColors ) {
	var backgroundColorsArray = parseCSV( backgroundColors );
	return backgroundColorsArray[0];
}

function getborderColorsArray( borderColors ) {
	var borderColorsArray = parseCSV( borderColors );
	return borderColorsArray[0];
}

/**
 * Gets custom background colors for a pie chart.
 *
 * @param theme
 * @param opacity
 * @param backgroundColors
 * @returns {*}
 */
function getOverrideBackgroundColors( theme, opacity, backgroundColors ){
	var bgColorsArray = getbackgroundColorsArray( backgroundColors);
	var themeBGColors = getBackgroundColors( theme, opacity );
	console.log( bgColorsArray );
	if ( bgColorsArray === undefined ) {
		return themeBGColors;
	}
	//console.log( themeBGColors );
	for ( var i = 0; i < themeBGColors.length; i++ ) {
		var bgColor = bgColorsArray[i];
		console.log( "bgColor:" + bgColor + ":");
		if ( ( bgColor !== undefined)  && ( bgColor !== "") ) {
			var themeColor = rgba( bgColor, opacity);
			//console.log( themeColor );
			themeBGColors[i] = themeColor;
		}
	}
	return themeBGColors;

}

function getOverrideBackgroundColor(i, theme, opacity, backgroundColors ) {
	const colors = getOverrideBackgroundColors(theme, opacity, backgroundColors);
	var choice = (i - 1) % colors.length;
	var color = colors[choice];
	return color;
}

function mergeSparseArrays( array1, array2 ) {
	if ( array2 === undefined ) return array1;
	if ( array1 === undefined ) return array2;

	for ( var i = 0; i < Math.max( array1.length, array2.length ); i++ ) {
		var value2 = array2[i];
		if ( value2 !== undefined && value2 !== "" ) {
			array1[i] = value2;
		}
	}
	return array1;
}

/**
 * Return an override border color.
 *
 * @param i
 * @param theme
 * @param opacity
 * @param backgroundColors
 * @param borderColors
 * @returns {*}
 */
function getOverrideBorderColor( i, theme, opacity, backgroundColors, borderColors) {
	var bgColorsArray = getbackgroundColorsArray( backgroundColors);
	var borderColorsArray = getborderColorsArray( borderColors );
	var mergedArray = mergeSparseArrays( bgColorsArray, borderColorsArray );
	var mergedColors = mergedArray === undefined ? "" : mergedArray.join();
	var borderColor = getOverrideBackgroundColor( i, theme, opacity, mergedColors );
	return borderColor;
}

/**
 * Parses a CSV into a 2 dimensional array.
 *
 * Note: If the input is a single line then the result is an array with the parsed data in row 0.
 *
 * https://stackoverflow.com/questions/1293147/how-to-parse-csv-data
 * @param str
 * @returns {*[]}
 */
function parseCSV(str) {
	var arr = [];
	var quote = false;  // 'true' means we're inside a quoted field
	if ( undefined === str ) {
		return arr;
	}

	// Iterate over each character, keep track of current row and column (of the returned array)
	for (var row = 0, col = 0, c = 0; c < str.length; c++) {
		var cc = str[c], nc = str[c+1];        // Current character, next character
		arr[row] = arr[row] || [];             // Create a new row if necessary
		arr[row][col] = arr[row][col] || '';   // Create a new column (start with empty string) if necessary

		// If the current character is a quotation mark, and we're inside a
		// quoted field, and the next character is also a quotation mark,
		// add a quotation mark to the current column and skip the next character
		if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }

		// If it's just one quotation mark, begin/end quoted field
		if (cc == '"') { quote = !quote; continue; }

		// If it's a comma and we're not in a quoted field, move on to the next column
		if (cc == ',' && !quote) { ++col; continue; }

		// If it's a newline (CRLF) and we're not in a quoted field, skip the next character
		// and move on to the next row and move to column 0 of that new row
		if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }

		// If it's a newline (LF or CR) and we're not in a quoted field,
		// move on to the next row and move to column 0 of that new row
		if (cc == '\n' && !quote) { ++row; col = 0; continue; }
		if (cc == '\r' && !quote) { ++row; col = 0; continue; }

		// Otherwise, append the current character to the current column
		arr[row][col] += cc;
	}
	return arr;
}

export { getOverrideBackgroundColors, getOverrideBackgroundColor, getOverrideBorderColor, parseCSV };
