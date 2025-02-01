'use client';

import { useListApplicationQuery } from '@/services/modules/applications';
import { volumeApi } from '@/services/modules/volume';

import { useTranslation } from '@/i18n';

import { FormView } from '@/components';

type PropTypes = {
	params: {
		lang: string;
		company: string;
		project: string;
		namespace: string;
		application: string;
	};
};

export default function NewVolume({ params }: PropTypes) {
	const { t } = useTranslation();
	const { data } = useListApplicationQuery(
		{ company: params.company, project: params.project, namespace: params.namespace },
	);

	return (
		<FormView
			api={volumeApi.endpoints.createPvc}
			requestParams={params}
			redirect="back"
			submitLabel={t('pages.volume.create')}
			transformRequest={d => {
				return {
					body: { ...d },
				};
			}}
			blocks={[{
				name: 'general',
				type: 'input',
				inputs: [
					{
						name: 'mount_path',
						type: 'text',
						label: t('pages.volume.fields.mount_path'),
						placeholder: t('pages.volume.fields.mount_path'),
						className: 'w-full',
						rules: {
							required: {
								value: true,
								message: t('errors.field_is_required', { field: t('pages.volume.fields.mount_path') }),
							},
						},
					},
					{
						name: 'name',
						type: 'text',
						label: t('pages.volume.fields.name'),
						placeholder: t('pages.volume.fields.name'),
						className: 'w-full',
						rules: {
							required: {
								value: true,
								message: t('errors.field_is_required', { field: t('pages.volume.fields.name') }),
							},
						},
					},
					{
						name: 'plan',
						type: 'select',
						label: t('pages.volume.fields.plan'),
						placeholder: t('pages.volume.fields.plan'),
						className: 'w-full',
						options: [{ value: 'S', label: '2GB' }, { value: 'M', label: '8GB' }, { value: 'L', label: '32GB' }, { value: 'XL', label: '128GB' }],
						rules: {
							required: {
								value: true,
								message: t('errors.field_is_required', { field: t('pages.volume.fields.plan') }),
							},
						},
					},
					{
						name: 'application_id',
						type: 'select',
						label: t('pages.volume.fields.application'),
						placeholder: t('pages.volume.fields.application'),
						className: 'w-full',
						options: data?.data?.applications.length
							? data?.data.applications.map(item => ({ label: item.name, value: item.id }))
							: [],
						rules: {
							required: {
								value: true,
								message: t('errors.field_is_required', { field: t('pages.volume.fields.application') }),
							},
						},
					},
				],
			}]}
		/>
	);
}
