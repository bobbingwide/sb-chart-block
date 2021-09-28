/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	//console.log( 'Save()');
	//	console.log( attributes.height );
	const blockProps = useBlockProps.save();
	return(
		<div {...blockProps}>
			<div className={"chartjs"} style={ { height: attributes.height} }>
				<canvas id={ attributes.myChartId }></canvas>
			</div>
		</div>
	);
}
