'use client';

import { envoirmentsApi } from '@/services/modules/envoirments';

import { useTranslation } from '@/i18n';

import { FormView } from '@/components';

type PropTypes = {
	params: {
		company: string,
		project: string,
		namespace: string,
		application: string,
		buildTime?: boolean
	}
}

export default function ConfigmapForm({ params }: PropTypes) {
	const { t } = useTranslation();

	return (
		<FormView
			api={!params.buildTime
				? envoirmentsApi.endpoints.createConfigmap
				: envoirmentsApi.endpoints.createBuildConfigmap}
			submitLabel={t('buttons.add')}
			resetOnSuccess
			requestParams={params}
			className="w-full flex gap-x-5 items-center h-20 flex-row my-5 "
			blocks={
				[{
					name: 'general',
					type: 'input',
					inputs: [{
						name: 'key',
						type: 'text',
						label: t('pages.configmap.form.key.label'),
						placeholder: t('pages.configmap.form.key.placeholder'),
						className: '-mt-2',
						rules: {
							required: {
								value: true,
								message: t('errors.field_is_required', { field: t('pages.configmap.form.key.label') }),
							},
						},
					}, {
						name: 'value',
						type: 'text',
						label: t('pages.configmap.form.value.label'),
						placeholder: t('pages.configmap.form.value.placeholder'),
						className: '-mt-2',
						rules: {
							required: {
								value: true,
								message: t('errors.field_is_required', { field: t('pages.configmap.form.value.label') }),
							},
						},
					}],
				}]
			}
		/>
	);
}
