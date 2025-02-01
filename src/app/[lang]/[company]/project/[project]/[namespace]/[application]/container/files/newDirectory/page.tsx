'use client';

import { useState } from 'react';
import { useRouter } from 'next-nprogress-bar';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { applicationsApi } from '@/services/modules/applications';

import { useTranslation } from '@/i18n';

import { setUploadFileMeta } from '@/store/slices/app';
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

export default function NewDirectory({ params }: PropTypes) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        company, project, namespace, application,
    } = params;

    const { t } = useTranslation();
    const { uploadFileMeta } = useAppSelector(state => state.app);

    const router = useRouter();
    const dispatch = useAppDispatch();

    // const handleMakeDirectory = useCallback(async (file: File) => {
    //     setIsLoading(true);
    //     try {
    //         const result = await dispatch(applicationsApi.endpoints.uploadApplicationFile.initiate({
    //             company,
    //             project,
    //             namespace,
    //             application,
    //             meta: uploadFileMeta.meta,
    //             container: uploadFileMeta.container,
    //             body: {
    //                 source: uploadFileMeta.fileNamePath || '/',
    //                 file,
    //             },
    //         })).unwrap();

    //         dispatch(setUploadFileMeta({
    //             uploadFileMeta: {
    //                 meta: uploadFileMeta.meta,
    //                 container: uploadFileMeta.container,
    //                 fileNamePath: uploadFileMeta.fileNamePath || '/',
    //                 data: result.data,
    //                 refetch: true
    //             },
    //         }));
    //         router.back();
    //         setIsLoading(false);
    //     }
    //     catch (err) {
    //         setIsLoading(false);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dispatch]);

    return (
        <FormView
            submitLabel={t('buttons.create')}
            api={applicationsApi.endpoints.getApplicationFiles}
            transformRequest={(data) => {
                console.log(data)
                return {
                    body: {
                        source: (uploadFileMeta.fileNamePath === '/' ? '' : uploadFileMeta.fileNamePath) + '/' + data?.dirName,
                        action: 'mkdir'
                    }
                }
            }}
            onSuccess={(result) => {
                dispatch(setUploadFileMeta({
                        uploadFileMeta: {
                            meta: uploadFileMeta.meta,
                            container: uploadFileMeta.container,
                            fileNamePath: uploadFileMeta.fileNamePath || '/',
                            data: result.data,
                            refetch: true
                        },
                    }));
             router.back();
            }}
            requestParams={{
                company,
                project,
                namespace,
                application,
                meta: uploadFileMeta.meta,
                container: uploadFileMeta.container
            }}
            blocks={[
                {
                    type: 'input',
                    name: 'general',
                    inputs: [{
                        name: 'dirName',
                        type: 'text',
                        placeholder: t('pages.applications.dirName'),
                        rules: {
                            required: {
                                value: true,
                                message: t('errors.field_is_required', { field: t('pages.applications.dirName') }),
                            },
                        },
                    }],
                }]}
        />
    );
}
