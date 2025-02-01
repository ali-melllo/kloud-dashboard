'use client';

import React, {
	useCallback, useEffect,
} from 'react';
import { useFieldArray } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { X } from '@phosphor-icons/react';

import { Button } from '@/registry/new-york/ui/button';

import InputController from '@/components/controllers/FormView/InputController';
import { InputPropTypes } from '@/components/controllers/FormView/type';

type PropTypes = {
	name: string;
	control: any,
	inputs: InputPropTypes[];
	buttonLabel?: string;
	defaultValue?: any;
	title?: string;
	description?: string;
}

function ComplexInputsController({
	name,
	control,
	inputs,
	buttonLabel,
	defaultValue,
	title,
	description,
}: PropTypes, _ref: React.Ref<any>) {
	const { fields, append, remove } = useFieldArray({ control, name });

	const handleRemoveBlock = useCallback((index: number) => {
		remove(index);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleAppendBlock = useCallback(() => {
		append(undefined);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (defaultValue && defaultValue.length) {
			defaultValue.forEach((v: any) => {
		    append(v);
			});
		}
	}, []);

	return (
		<div className="grid gap-5">
			<div className="flex flex-col w-full gap-y-5 pt-16">
				<div className="flex flex-row justify-between items-center">
					<div>
						<p className="text-sm font-semibold">{title || ''}</p>
						<ReactMarkdown className="text-gray-500 text-xs">{description || ''}</ReactMarkdown>
					</div>
					<Button
						type="button"
						size="sm"
						className="w-fit"
						onClick={handleAppendBlock}
					>
						{buttonLabel}
					</Button>
				</div>
				{fields?.map((field, i) => (
					<div key={field.id} className="flex items-center">
						{inputs.map(input => (
							<div className="flex-1 mr-4 min-w-12" key={input.name}>
								<InputController {...input} name={`${name}[${i}][${input.name}]`} control={control} />
							</div>
						))}

						<Button className="mt-5" variant="outline" size="icon" onClick={() => handleRemoveBlock(i)}><X /></Button>
					</div>
				))}
			</div>
		</div>
	);
}

export default ComplexInputsController;
