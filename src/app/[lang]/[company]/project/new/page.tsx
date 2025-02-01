'use client';

import { projectsApi } from '@/services/modules/projects';

import { useTranslation } from '@/i18n';

import { FormView } from '@/components';

type PropTypes = {
	params: {
		company: string, project: string, namespace: string
	}
}

export default function ProjectNew({ params }: PropTypes) {
	const { t } = useTranslation();

	return (
		<FormView
			api={projectsApi.endpoints.createProject}
			requestParams={params}
			redirect="back"
			submitLabel={t('buttons.create')}
			blocks={[{
				name: 'general',
				type: 'input',
				inputs: [
					{
						name: 'project',
						type: 'text',
						label: t('pages.projects.form.project_name.label'),
						placeholder: t('pages.projects.form.project_name.placeholder'),
						rules: {
							required: {
								value: true,
								message: t('errors.field_is_required', { field: t('pages.projects.form.project_name.label') }),
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
