<?php

/**
 * Returns the array index or default.
 *
 * To allow for invocation by shortcode, where attribute names are lower cased, not case sensitive,
 * this now tests for the mixed case $index first, then the lower case version.
 *
 * @param $array
 * @param $index
 * @param null $default
 *
 * @return mixed|null
 */
function sb_chart_block_array_get( $array, $index, $default=null ) {
	if ( isset( $array ) ) {
		$lc_index = strtolower( $index );
		if ( isset( $array[ $index ] ) ) {
			$value = $array[ $index ];
		} elseif ( isset( $array[ $lc_index]) ) {
			$value = $array[ $lc_index ];
		} else {
			$value = $default;
		}
	} else {
		$value = $default;
	}
	return $value;
}

/**
 * Returns an array from a CSV string. If the data is empty or if it's not a string, an empty array is returned (unless "$min_nb_fields" > 0).
 *
 * @param string $data CSV string.
 * @param bool $empty_to_null Replace empty strings with `null` (useful to prevent Chart.js to draw empty data).
 * @param int $min_nb_fields Minimum number of fields. If the array has less than this number of fields, items are added to reach the count.
 * @param mixed $new_item_value Value to use if some items are added to reach the minimum number of fields.
 *
 * @return array
 */
function sb_chart_block_get_csv( $data, $empty_to_null = false, $min_nb_fields = 0, $new_item_value = '' ) {
	$array = [];

	if ( is_string( $data ) && '' !== $data ) {
		$array = str_getcsv( $data, ",", '"', "" );
		if ($empty_to_null) {
			foreach ( $array as $key => $value ) {
				if ( '' === $value ) {
					$array[$key] = null;
				}
			}
		}
	}

	$nb_new_fields = $min_nb_fields - count( $array );
	for ( $i = 0; $i < $nb_new_fields; $i++ ) {
		$array[] = $new_item_value;
	}

	return $array;
}

/**
 * Replaces elements from the second array into the first array, unless elements are empty strings.
 *
 * @param array
 * @param array
 *
 * @return array
 */
function sb_chart_block_array_replace( $array1, $array2 ) {
	$replaced = [];
	if ( is_array( $array1 ) && is_array( $array2 ) ) {
		$replaced = $array1;
		foreach ( $array2 as $key => $value ) {
			if ( '' === $value ) {
				continue;
			}
			$replaced[$key] = $value;
		}
	}
	return $replaced;
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

