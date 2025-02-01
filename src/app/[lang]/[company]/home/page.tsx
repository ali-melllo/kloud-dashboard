'use client';

import { useTranslation } from '@/i18n';

export default function CompanyHomePage() {
	const { t } = useTranslation();
	return (
		<div>
			{t('pages.home.home')}
		</div>
	);
}
