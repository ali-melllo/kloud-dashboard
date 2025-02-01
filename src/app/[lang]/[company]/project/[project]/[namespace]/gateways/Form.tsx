'use client';

import { TextUtils } from '@/lib/Utils';

import { useTranslation } from '@/i18n';

import { FormView } from '@/components';

type PropTypes = {
	params: {
		company: string,
		project: string,
		namespace: string,
		gateway?: string;
	}
	api: any;
	submitLabel: string;
	defaultValues?: {
		hostnames: string,
		matches: [],
		backends: [],
		filters: []
	}
}

export default function GatewayForm({
	params: {
		company,
		project,
		namespace,
		gateway,
	},
	submitLabel,
	defaultValues,
	api,
}: PropTypes) {
	const { t } = useTranslation();
	return (
		<div className="flex">
			<FormView
				api={api}
				submitLabel={submitLabel}
				requestParams={{
					company,
					project,
					namespace,
					gateway,
				}}
				redirect={`/${company}/project/${project}/${namespace}/gateways/list`}
				transformRequest={data => {
					const body: any = {
						rules: [{}],
					};
					if (data.hostnames && data.hostnames.length) {
						body.hostnames = data.hostnames;
					}
					if (data.matches && data.matches.length) {
						body.rules[0].matches = data.matches.map((m: any) => ({
							path: m,
						}));
					}
					if (data.filters && data.filters.length) {
						body.rules[0].filters = data.filters.map((f: any) => {
							let actionData;
							if (f.action === 'remove') {
								actionData = [f.name];
							}
							else {
								actionData = [{
									name: f.name,
									value: f.value,
								}];
							}
							return {
								type: f.type,
								[TextUtils.toLowerFirstLetter(f.type)]: {
									[f.action]: actionData,
								},
							};
						});
					}
					if (data.backends && data.backends.length) {
						body.rules[0].backends = data.backends.map((b: any) => ({
							...b,
							port: parseInt(b.port, 10),
							wight: parseInt(b.wight, 10),
						}));
					}
					return {
						body,
					};
				}}
				blocks={[
					{
						name: 'host',
						type: 'input',
						inputs: [{
							name: 'hostnames',
							type: 'multiselect',
							description: t('pages.gateways.form.hostname.description'),
							label: t('pages.gateways.form.hostname.label'),
							placeholder: t('pages.gateways.form.hostname.placeholder'),
							defaultValue: defaultValues?.hostnames,
							rules: {
								required: {
									value: true,
									message: t('errors.field_is_required', { field: t('pages.gateways.form.hostname.label') }),
								},
							},
						}],
					},
					{
						name: 'matches',
						type: 'complex',
						title: t('pages.gateways.form.matches.match'),
						description: t('pages.gateways.form.matches.description'),
						buttonLabel: t('pages.gateways.form.matches.button'),
						defaultValue: defaultValues?.matches,
						inputs: [
							{
								name: 'type',
								type: 'select',
								label: t('pages.gateways.form.matches.type.label'),
								options: [
									{ value: 'Exact', label: 'Exact' },
									{ value: 'RegularExpression', label: 'Regex' },
									{ value: 'PathPrefix', label: 'PathPrefix' },
								],
								defaultValue: 'Exact',
							},
							{
								name: 'value',
								type: 'text',
								label: t('pages.gateways.form.matches.value.label'),
								placeholder: t('pages.gateways.form.matches.value.placeholder'),
								rules: {
									required: {
										value: true,
										message: t('errors.field_is_required', { field: t('pages.gateways.form.matches.value.label') }),
									},
								},
							},
						],
					},
					{
						name: 'filters',
						type: 'complex',
						title: t('pages.gateways.form.filters.filter'),
						description: t('pages.gateways.form.filters.description'),
						buttonLabel: t('pages.gateways.form.filters.button'),
						defaultValue: defaultValues?.filters,
						inputs: [
							{
								name: 'type',
								type: 'select',
								label: t('pages.gateways.form.filters.type.label'),
								options: [
									{ value: 'RequestHeaderModifier', label: t('pages.gateways.form.filters.type.RequestHeaderModifier.label') },
									{ value: 'ResponseHeaderModifier', label: t('pages.gateways.form.filters.type.ResponseHeaderModifier.label') },
								],
								defaultValue: 'RequestHeaderModifier',
							},
							{
								name: 'action',
								type: 'select',
								label: t('pages.gateways.form.filters.action.label'),
								options: [{ value: 'add', label: 'Add' }, { value: 'set', label: 'Set' }, { value: 'remove', label: 'Remove' }],
								defaultValue: 'add',
							},
							{
								name: 'name',
								type: 'text',
								label: t('pages.gateways.form.filters.name.label'),
								placeholder: t('pages.gateways.form.filters.name.label'),
								rules: {
									required: {
										value: true,
										message: t('errors.field_is_required', { field: t('pages.gateways.form.filters.name.label') }),
									},
								},
							},
							{
								name: 'value',
								type: 'text',
								label: t('pages.gateways.form.filters.value.label'),
								placeholder: t('pages.gateways.form.filters.value.label'),
								rules: {
									required: {
										value: true,
										message: t('errors.field_is_required', { field: t('pages.gateways.form.filters.value.label') }),
									},
								},
							},
						],
					},
					{
						name: 'backends',
						type: 'complex',
						buttonLabel: t('pages.gateways.form.backends.button'),
						title: t('pages.gateways.form.backends.button'),
						description: t('pages.gateways.form.backends.description'),
						defaultValue: defaultValues?.backends,
						inputs: [
							{
								name: 'name',
								type: 'text',
								placeholder: t('pages.gateways.form.backends.name.label'),
								label: t('pages.gateways.form.backends.name.label'),
								rules: {
									required: {
										value: true,
										message: t('errors.field_is_required', { field: t('pages.gateways.form.backends.name.label') }),
									},
								},
							},
							{
								name: 'port',
								type: 'number',
								placeholder: t('pages.gateways.form.backends.port.label'),
								label: t('pages.gateways.form.backends.port.label'),
								rules: {
									required: {
										value: true,
										message: t('errors.field_is_required', { field: t('pages.gateways.form.backends.port.label') }),
									},
								},
							},
							{
								name: 'wight',
								type: 'number',
								placeholder: t('pages.gateways.form.backends.wight.label'),
								label: t('pages.gateways.form.backends.wight.label'),
								rules: {
									required: {
										value: true,
										message: t('errors.field_is_required', { field: t('pages.gateways.form.backends.wight.label') }),
									},
								},
							},
						],
					},
				]}
			/>
		</div>
	);
}
