'use client';

import React, { useCallback } from 'react';

import { useAppDispatch } from '@/store/hooks';

import { namespacesApi } from '@/services/modules/namespaces';

import { useTranslation } from '@/i18n';

import SettingCard from '@/components/ui/settingCard';

type PropTypes = {
	params: {
		lang: string, company: string, project: string, namespace: string
	}
}

export default function KubeCtlPage({
	params: {
		company, project, namespace,
	},
}: PropTypes) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const downloadKubeCtlHandler = useCallback(async () => {
		try {
		// Call the API to initiate file download
			const result :any = await dispatch(namespacesApi.endpoints.downloadKubeCtl.initiate({
				company, project, namespace,
			})).unwrap();

			const blob = new Blob([result], { type: result.type || 'application/octet-stream' });

			const downloadUrl = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = downloadUrl;

			link.download = 'kubectl-config-file.yaml'; // Change filename as necessary

			document.body.appendChild(link);
			link.click();

			document.body.removeChild(link);
			window.URL.revokeObjectURL(downloadUrl);
		}
		catch (err) {
			console.error('Error downloading the file:', err); // Handle the error
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, company, project, namespace]);

	return (
		<div className="flex flex-row w-full">
			<SettingCard
				description={t('descriptions.kubectl')}
				title={t('buttons.download') + t('navbar.kubectl')}
				actionButtons={[
					{
						label: t('buttons.download'),
						onClick: downloadKubeCtlHandler,
					},
				]}
				// form={{
				// 	blocks: [{
				// 		type: 'input',
				// 		name: 'project',
				// 		inputs: [{
				// 			name: 'name',
				// 			type: 'text',
				// 			label: t('pages.projects.name'),
				// 			placeholder: t('pages.projects.name'),
				// 			defaultValue: '',
				// 			className: 'w-96',
				// 			rules: {
				// 				required: {
				// 					value: true,
				// 					message: t('errors.field_is_required', { field: 'name' }),
				// 				},
				// 			},
				// 		}],
				// 	}],
				// 	submitLabel: t('pages.projects.delete'),
				// 	api: namespacesApi.endpoints.downloadKubeCtl,
				// }}

			/>
		</div>
	);
}
