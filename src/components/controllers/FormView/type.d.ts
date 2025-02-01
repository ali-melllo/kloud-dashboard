import { InputValidationRules } from 'react-hook-form';

export type RuleType = { value: boolean | number; message?: string };

export type InputPropTypes = {
	type:
		| 'text'
		| 'number'
		| 'password'
		| 'checkbox'
		| 'select'
		| 'multiselect'
		| 'email';
	name: string;
	defaultValue?: string | number;
	placeholder?: string | number;
	label?: string;
	rules?: Record<InputValidationRules, { value: boolean; message: string }>;
	options?: { value: string | number | boolean; label: string }[];
	description?: string;
	className?:string;
};

export type InputBlock = {
	name: string;
	inputs: InputPropTypes[];
	type: 'input' | 'complex';
	buttonLabel?: string;
	title?:string;
	description?:string;
	defaultValue?:{}
};

export type FormViewPropType = {
	blocks: InputBlock[];
	submitLabel?: string;
	onSuccess?: (_: any) => void;
	resetOnSuccess?: boolean;
	transformRequest?: (_: {}) => any;
	onError?: () => void;
	api: any;
	requestParams?: Record;
	id?: string;
	redirect?: 'back' | string;
	className?:string;
	hideButton?:boolean;
};
