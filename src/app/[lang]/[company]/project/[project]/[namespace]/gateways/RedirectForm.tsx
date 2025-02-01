'use client';

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
	};
}

export default function RedirectForm({
	params: {
		company,
		project,
		namespace,
	},
	api,
	submitLabel,
	defaultValues,
}: PropTypes) {
	const { t } = useTranslation();

	return (
		<div className="w-full">
			<FormView
				api={api}
				submitLabel={submitLabel}
				requestParams={{
					company,
					project,
					namespace,
				}}
				redirect={`/${company}/project/${project}/${namespace}/gateways/list`}
				transformRequest={data => {
					const body: {
					hostnames: [{ matches?: [] }],
					rules: [{ filters?: [{}], backends?: [], matches: [] }]
				} = {
					hostnames: [{ matches: [] }],
					rules: [{ filters: [{}], backends: [], matches: [] }],
				};
					if (data.hostnames && data.hostnames.length) {
						body.hostnames = data.hostnames;
					}
					if (data.matches && data.matches.length) {
						body.rules[0].matches = data.matches.map((m: string) => ({
							path: m,
						}));
					}
					if (data.filters && data.filters.length) {
						body.rules[0].filters = [{
							requestRedirect: data.filters[0].requestRedirect,
							type: 'RequestRedirect',
						}];
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
						title: t('pages.gateways.form.matches.match'),
						description: t('pages.gateways.form.matches.description'),
						type: 'complex',
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
								placeholder: t('pages.gateways.form.matches.value.placeholder'),
								label: t('pages.gateways.form.matches.value.label'),
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
								name: 'requestRedirect',
								type: 'text',
								label: 'Url',
								placeholder: 'Url ...',
								className: 'w-full',
							},
						],
					},
				]}
			/>
		</div>
	);
}
