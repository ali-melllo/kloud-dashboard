'use client';

import { useCallback, useEffect, useState } from 'react';
import { CircleNotch } from '@phosphor-icons/react';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next-nprogress-bar';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUploadFileMeta } from '@/store/slices/app';

import { applicationsApi } from '@/services/modules/applications';

import { useTranslation } from '@/i18n';

import { Input } from '@/registry/new-york/ui/input';

type PropTypes = {
    params: {
        lang: string;
        company: string;
        project: string;
        namespace: string;
        application: string;
    };
};

export default function NewFile({ params }: PropTypes) {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const {
		company, project, namespace, application,
	} = params;

	const { t } = useTranslation();
	const { uploadFileMeta } = useAppSelector(state => state.app);

	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (uploadFileMeta) {
			if (!uploadFileMeta.meta || !uploadFileMeta.container || !uploadFileMeta.fileNamePath) {
				// router.back();
			}
		}
	}, [uploadFileMeta]);

	const handleUploadFile = useCallback(async (file: File) => {
		setIsLoading(true);
		try {
			const result = await dispatch(applicationsApi.endpoints.uploadApplicationFile.initiate({
				company,
				project,
				namespace,
				application,
				meta: uploadFileMeta.meta,
				container: uploadFileMeta.container,
				body: {
					source: uploadFileMeta.fileNamePath || '/',
					file,
				},
			})).unwrap();

			dispatch(setUploadFileMeta({
				uploadFileMeta: {
					meta: uploadFileMeta.meta,
					container: uploadFileMeta.container,
					fileNamePath: uploadFileMeta.fileNamePath || '/',
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
		<div className="w-full flex justify-center items-center">
			<Label
				className="border-2 cursor-pointer rounded-xl border-dashed w-10/12 h-44 flex justify-center items-center"
			>
				{!isLoading
					? (
						<>
							<Input
								onChange={e => e.target?.files && handleUploadFile(e.target?.files[0])}
								className="hidden cursor-pointer"
								placeholder="Upload File"
								name="file"
								type="file"
							/>
							{t('pages.applications.uploadFile')}
						</>
					)
					: <CircleNotch className="mr-2 h-4 w-4 animate-spin" />}
			</Label>
		</div>
	);
}
