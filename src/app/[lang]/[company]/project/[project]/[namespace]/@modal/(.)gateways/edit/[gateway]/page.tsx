'use client';

import { useTranslation } from '@/i18n';

import { Modal } from '@/components';

import GatewayEdit from '../../../../gateways/edit/[gateway]/page';

type PropTypes = {
	params: {
		company: string,
		project: string,
		namespace: string,
		gateway: string,
	}
}

export default function GatewayEditModal({ params }: PropTypes) {
	const { t } = useTranslation();

	return (
		<Modal title={t('pages.configmap.edit_title')}>
			<GatewayEdit params={params} />
		</Modal>
	);
}
