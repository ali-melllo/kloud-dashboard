'use client';

import { useTranslation } from '@/i18n';

import { Modal } from '@/components';

import NewFile from '../../../../container/files/new/page';
import NewDirectory from '../../../../container/files/newDirectory/page';

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
		<Modal description={t('descriptions.newDirectory')} title={t('pages.applications.newDirectory')}>
			<NewDirectory params={params} />
		</Modal>
	);
}
