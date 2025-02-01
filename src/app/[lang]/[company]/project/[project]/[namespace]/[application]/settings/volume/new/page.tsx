'use client';

import { useAppSelector } from '@/store/hooks';

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
	const { application } = useAppSelector(state => state.app);

	const { t } = useTranslation();

	return (
		<FormView
			api={volumeApi.endpoints.createPvc}
			requestParams={params}
			redirect="back"
			submitLabel={t('pages.volume.create')}
			transformRequest={d => {
				return {
					body: {
						...d,
						application_id: application.id,
					},
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
				],
			}]}
		/>
	);
}
