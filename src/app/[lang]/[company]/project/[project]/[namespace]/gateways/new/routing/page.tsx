'use client';

import { gatewaysApi } from '@/services/modules/gateways';

import { useTranslation } from '@/i18n';

import GatewayForm from '../../Form';

type PropTypes = {
	params: {
		company: string,
		project: string,
		namespace: string
	}
}

export default function Routing({ params }: PropTypes) {
	const { t } = useTranslation();

	return (
		<GatewayForm
			params={params}
			api={gatewaysApi.endpoints.createGateway}
			submitLabel={t('buttons.create')}
		/>
	);
}
