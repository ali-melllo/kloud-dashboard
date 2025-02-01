'use client';

import { useTranslation } from '@/i18n';

import { Modal } from '@/components';

import ProjectNew from '../../../project/new/page';

type PropTypes = {
	params: {
		company: string,
		project: string,
		namespace: string,
	}
}

export default function ProfileUpdateModal({ params }: PropTypes) {
	const { t } = useTranslation();

	return (
		<Modal title={t('pages.projects.create')}>
			<ProjectNew params={params} />
		</Modal>
	);
}
