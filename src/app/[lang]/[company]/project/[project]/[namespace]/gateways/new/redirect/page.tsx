'use client';

import { gatewaysApi } from '@/services/modules/gateways';

import { useTranslation } from '@/i18n';

import RedirectForm from '../../RedirectForm';

type PropTypes = {
	params: {
		company: string,
		project: string,
		namespace: string
	}
}

export default function Redirect({ params }: PropTypes) {
	const { t } = useTranslation();

	return (
		<RedirectForm
			params={params}
			api={gatewaysApi.endpoints.createGateway}
			submitLabel={t('buttons.create')}
		/>
	);
}
