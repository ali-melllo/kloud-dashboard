'use client';

import { useTranslation } from '@/i18n';

import { Modal } from '@/components';

import NewFile from '../../../../container/files/new/page';

type PropTypes = {
	params: {
        lang: string;
        company: string;
        project: string;
        namespace: string;
        application: string;
        meta: string;
    };
}

export default function FileUploadModal({ params }: PropTypes) {
	const { t } = useTranslation();

	return (
		<Modal description={t('descriptions.uploadFile')} title={t('pages.applications.uploadFile')}>
			<NewFile params={params} />
		</Modal>
	);
}
