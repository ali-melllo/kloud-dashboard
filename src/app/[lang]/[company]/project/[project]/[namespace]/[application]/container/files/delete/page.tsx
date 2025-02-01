'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next-nprogress-bar';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUploadFileMeta } from '@/store/slices/app';

import { applicationsApi } from '@/services/modules/applications';

import { useTranslation } from '@/i18n';

import { Button } from '@/registry/new-york/ui/button';

type PropTypes = {
    params: {
        lang: string;
        company: string;
        project: string;
        namespace: string;
        application: string;
    };
};

export default function DeleteFile({ params }: PropTypes) {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const {
		company, project, namespace, application,
	} = params;

	const { t } = useTranslation();
	const { uploadFileMeta } = useAppSelector(state => state.app);

	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleDeleteFile = useCallback(async () => {
		setIsLoading(true);
		try {
			const result = await dispatch(applicationsApi.endpoints.getApplicationFiles.initiate({
				company,
				project,
				namespace,
				application,
				meta: uploadFileMeta.meta,
				container: uploadFileMeta.container,
				body: {
					source: uploadFileMeta.fileName || '/',
					action: 'delete',
				},
			})).unwrap();

			dispatch(setUploadFileMeta({
				uploadFileMeta: {
					meta: uploadFileMeta.meta,
					container: uploadFileMeta.container,
					fileNamePath: uploadFileMeta.fileNamePath || '/',
					fileName: '',
					data: result.data,
					refetch: true,
				},
			}));
			router.back();
			setIsLoading(false);
		}
		catch (err) {
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	return (
		<div className="w-full h-full  justify-end gap-x-3 flex items-end">
			<Button
				onClick={router.back}
				isLoading={isLoading}
				disabled={isLoading}
				variant="outline"
			>
				{t('buttons.cancel')}
			</Button>
			<Button
				onClick={handleDeleteFile}
				isLoading={isLoading}
				className=" bg-red-600 transition-all duration-200 hover:bg-red-800 text-white"
				disabled={isLoading}
			>
				{t('buttons.delete')}
			</Button>
		</div>
	);
}
