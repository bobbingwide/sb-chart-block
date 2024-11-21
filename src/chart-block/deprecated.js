import { useBlockProps } from '@wordpress/block-editor';

import {getDefaultTheme} from "./theme-colors";

const v2 = {
	attributes: {
		type: { type: 'string', default: 'line', },
		content: { type: 'string', default: '', },
		theme: { type: 'string', default: getDefaultTheme() },
		myChartId: { type: 'string', default: 'myChart-' },
		stacked: { type: 'boolean', default: false },
		fill: { type: 'boolean', default: false },
		height: { type: 'integer', default: null },
		beginYAxisAt0: { type: 'boolean', default: false },
		opacity: { type: 'number', default: 0.8 }
	},
	save( props ) {
		const blockProps = useBlockProps.save();
		return(
			<div {...blockProps}>
				<div className={"chartjs"} style={ { height: props.attributes.height} }>
					<canvas id={ props.attributes.myChartId }></canvas>
				</div>
			</div>
		);

	}

}

const v1 = {
	attributes: {
		type: { type: 'string', default: 'line', },
		content: { type: 'string', default: '', },
		theme: { type: 'string', default: getDefaultTheme() },
		myChartId: { type: 'string', default: 'myChart-' },
		stacked: { type: 'boolean', default: false },
		fill: { type: 'boolean', default: false },
		height: { type: 'integer', default: null },
		beginYAxisAt0: { type: 'boolean', default: false },
		opacity: { type: 'number', default: 0.8 }
	},
	supports: {html: false, align: false },

	save( props ) {

		return <div className={"chartjs"} style={{height: props.attributes.height}}>
			<canvas id={props.attributes.myChartId}></canvas>
		</div>

	}
};

export default [ v2, v1 ];
