'use client';

import React, { useCallback } from 'react';
import { Pause, Play } from '@phosphor-icons/react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { applicationsApi } from '@/services/modules/applications';

import { appConst } from '@/configs';
import { showToast } from '@/lib/Utils/ToastUtils';

import { useTranslation } from '@/i18n';

import TitleCard from '@/components/templates/TitleCard';

type PropTypes = {
	children: React.ReactNode;
	modal: React.ReactNode;
	params: {
		lang: string, company: string, project: string, namespace: string, application: string
	}
}

export default function ApplicationLayout({
	children,
	modal,
	params: {
		company, project, namespace, application,
	},
}: PropTypes) {
	const { application: applicationData } = useAppSelector(state => state.app);

	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const startApplication = useCallback(async () => {
		try {
			await dispatch(applicationsApi.endpoints.startApplication.initiate({
				company, project, namespace, application,
			})).unwrap();
			showToast({
				title: t('notifications.appStarted'),
				variant: 'default',
			});
		}
		catch (err) { /* Errors */ }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	const stopApplication = useCallback(async () => {
		try {
			await dispatch(applicationsApi.endpoints.stopApplication.initiate({
				company, project, namespace, application,
			})).unwrap();
			showToast({
				title: t('notifications.appStopped'),
				variant: 'default',
			});
		}
		catch (err) { /* Errors */ }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	return (
		<>
			<TitleCard
				hideOnKey={['settings', 'container']}
				activePageRange={7}
				navBarItems={appConst.projectNavbarItems}
				buttons={applicationData && applicationData?.type === 'ci/cd' ? [
					{
						key: 'overview',
						label: t('pages.applications.start'),
						onClick: startApplication,
						icon: <Play />,
						variant: applicationData.running ? 'outline' : 'default',
					},
					{
						key: 'overview',
						label: t('pages.applications.pause'),
						onClick: stopApplication,
						icon: <Pause />,
						variant: applicationData.running ? 'default' : 'outline',
					},
				] : []}
			/>
			{children}
			{modal}
		</>
	);
}
