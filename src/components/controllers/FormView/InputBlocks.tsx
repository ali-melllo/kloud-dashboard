import React from 'react';
import { Control } from 'react-hook-form';

import ComplexInputsController from '@/components/dataInput/ComplexInputs';

import InputController from './InputController';
import { InputBlock } from './type';

type PropTypes = {
	blocks: InputBlock[];
	control: Control;
};

export default function InputBlocks({ blocks, control }: PropTypes) {
	return (
		blocks.map(block => {
			return (
				block.type === 'input' ? (
					block.inputs.map(input => (
						<InputController key={input.name} control={control} {...input} />
					))
				) : (
					<ComplexInputsController control={control} {...block} />
				)
			);
		})
	);
}
