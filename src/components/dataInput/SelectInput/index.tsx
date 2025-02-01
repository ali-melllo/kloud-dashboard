import React from 'react';

import {
	Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/registry/new-york/ui/select';

type PropTypes = {
	options: { label: string, value: string }[];
	value?: string;
	placeholder: string;
	onChange: (_: {}) => void;
}

function SelectInput(props: PropTypes, _ref: React.Ref<any>) {
	const {
		options, value, placeholder, onChange,
	} = props;

	return (
		<Select onValueChange={onChange} value={value}>
			<SelectTrigger>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent ref={_ref}>
				{options.map(option => (
					<SelectItem value={option.value}>
						<span className="font-medium">{option.label}</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

export default React.forwardRef(SelectInput);
