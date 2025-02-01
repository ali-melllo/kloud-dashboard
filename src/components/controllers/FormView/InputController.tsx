import React, { ForwardRefExoticComponent } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { Label } from '@/registry/new-york/ui/label';

import Checkbox from '../../dataInput/Checkbox';
import MultiSelectInput from '../../dataInput/MultiSelectInput';
import SelectInput from '../../dataInput/SelectInput';
import TextInput from '../../dataInput/TextInput';

import { InputPropTypes } from './type';

const formMap = {
	number: TextInput,
	text: TextInput,
	password: TextInput,
	select: SelectInput,
	multiselect: MultiSelectInput,
	checkbox: Checkbox,
	email: TextInput,
};

type PropTypes = UseControllerProps & InputPropTypes;

export default function InputController(props: PropTypes) {
	const {
		name, label, type, options, placeholder, description, className,
	} = props;

	const { field, fieldState: { error } } = useController(props);

	return (
		<div className="grid gap-2 w-full">
			{label && type !== 'checkbox' ? (
				<Label className="text-muted-foreground" htmlFor={name}>{label}</Label>
			) : null}

			{React.createElement(formMap[type] as
			ForwardRefExoticComponent<PropTypes & React.RefAttributes<any>>, {
				...field,
				type,
				options,
				placeholder,
				label,
				className: error ? `border-destructive ${className || 'w-full'}  ` : `${className || 'w-full'}`,
			})}

			{error && error.message ? (
				<span className="text-xs font-normal -mt-1 leading-none text-destructive">
					{error.message}
				</span>
			) : null}

			{description ? (
				<p className="text-[0.8rem] text-muted-foreground">
					{description}
				</p>
			) : null}
		</div>
	);
}
