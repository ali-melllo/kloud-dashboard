'use client';

import { useTranslation } from '@/i18n';

export default function CompanyBillingPage() {
	const { t } = useTranslation();
	return (
		<div>
			{t('pages.billing.billing')}
		</div>
	);
}
