'use client';

import { useTranslation } from '@/i18n';

import { Modal } from '@/components';

import ServiceNew from '../../../namespace/new/page';

type PropTypes = {
	params: {
		company: string,
		project: string,
		namespace: string
	}
}

export default function GatewayNewModal({ params }: PropTypes) {
	const { t } = useTranslation();

	return (
		<Modal title={t('namespace.create')}>
			<ServiceNew params={params} />
		</Modal>
	);
}
