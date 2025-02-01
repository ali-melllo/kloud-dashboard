'use client';

import { useTranslation } from '@/i18n';

import { Modal } from '@/components';

import ProfileUpdateForm from '../../../profile/update/page';

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
		<Modal title={t('pages.profile.update')}>
			<ProfileUpdateForm params={params} />
		</Modal>
	);
}
