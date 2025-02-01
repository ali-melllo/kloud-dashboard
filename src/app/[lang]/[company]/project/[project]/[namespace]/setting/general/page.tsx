'use client';

import React from 'react';

import { projectsApi } from '@/services/modules/projects';

import { useTranslation } from '@/i18n';

import SettingCard from '@/components/ui/settingCard';

type PropTypes = {
	params: {
		project: string
	}
}

export default function GeneralSetting({
	params: { project },
}: PropTypes) {
	const { t } = useTranslation();

	return (
		<div className="flex flex-row w-full">
			<div className="w-full flex flex-col">
				<SettingCard
					description={t('descriptions.deleteProject')}
					title={t('pages.projects.delete')}
					form={{
						blocks: [{
							type: 'input',
							name: 'project',
							inputs: [{
								name: 'name',
								type: 'text',
								label: t('pages.projects.name'),
								placeholder: t('pages.projects.name'),
								defaultValue: '',
								rules: {
									required: {
										value: true,
										message: t('errors.field_is_required', { field: 'name' }),
									},
									validate: (value: string) => value === project || t('errors.field_must_match_exact', { field: 'name' }),
								},
							}],
						}],
						submitLabel: t('pages.projects.delete'),
						api: projectsApi.endpoints.deleteProject,
					}}
				/>
			</div>
		</div>
	);
}
