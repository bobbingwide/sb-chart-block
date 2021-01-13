/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
import { withInstanceId } from '@wordpress/compose';

export default function save( { attributes } ) {
	console.log( attributes );
	//const myChartId = `myChart${ instanceId }`;
	//const myChartId = `myChart2`;
	//console.log( myChartId );


	return(
	<div className={"chartjs"}>
		<canvas id={ attributes.myChartId }></canvas>
	</div>
	);

}

//export default save;
