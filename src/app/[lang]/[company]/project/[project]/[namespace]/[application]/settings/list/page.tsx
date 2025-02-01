'use client';

import React, { useCallback } from 'react';

import { notificationProvider } from '@/providers/notificationProvider';

import { useAppDispatch } from '@/store/hooks';

import { applicationsApi } from '@/services/modules/applications';

import { useTranslation } from '@/i18n';

import SettingCard from '@/components/ui/settingCard';

type PropTypes = {
	params: {
		company: string, project: string, namespace: string, application: string
	}
}

export default function ProjectSetting({
	params: {
		company, project, namespace, application,
	},
}: PropTypes) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const stopApplication = useCallback(async () => {
		try {
			await dispatch(applicationsApi.endpoints.stopApplication.initiate({
				company, project, namespace, application,
			})).unwrap();
			notificationProvider.open({
				type: 'success', message: 'Your Application Is Turned off Now',
			});
		}
		catch (err) { /* Errors */ }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	return (
		<div className="flex flex-col gap-y-10 w-full">
			<SettingCard
				description={t('descriptions.stopApplication')}
				title={t('pages.applications.pause')}
				actionButtons={[{
					label: t('pages.applications.pause'),
					onClick: stopApplication,
				}]}
			/>

			<SettingCard
				description={t('descriptions.deleteApplication')}
				title={t('pages.applications.delete')}
				form={{
					blocks: [
						{
							type: 'input',
							name: 'project',
							inputs: [{
								name: 'name',
								type: 'text',
								placeholder: 'Application Name ...',
								defaultValue: '',
								rules: {
									required: {
										value: true,
										message: t('errors.field_is_required', { field: 'name' }),
									},
									validate: (value: string) => value === application || t('errors.field_must_match_exact', { field: 'name' }),
								},
							}],
						}],
					submitLabel: t('pages.applications.delete'),
					api: applicationsApi.endpoints.deleteApplication,
				}}
			/>

		</div>
	);
}
