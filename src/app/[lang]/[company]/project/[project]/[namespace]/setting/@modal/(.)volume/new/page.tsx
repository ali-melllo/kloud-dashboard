'use client';

import { useTranslation } from '@/i18n';

import { Modal } from '@/components';

import NewVolume from '../../../volume/new/page';

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

export default function NewVolumeModal({ params }: PropTypes) {
	const { t } = useTranslation();

	return (
		<Modal title={t('pages.volume.create')}>
			<NewVolume params={params} />
		</Modal>
	);
}
