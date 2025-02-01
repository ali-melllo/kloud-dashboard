'use client';

import { useTranslation } from '@/i18n';

import { Modal } from '@/components';

import DeleteFile from '../../../../container/files/delete/page';

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

export default function DeleteFileModal({ params }: PropTypes) {
	const { t } = useTranslation();

	return (
		<Modal description={t('Are You Sure You Want To Delete This Item ?')} title={t('Delete Selected Item')}>
			<DeleteFile params={params} />
		</Modal>
	);
}
