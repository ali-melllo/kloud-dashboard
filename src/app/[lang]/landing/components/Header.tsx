'use client';

import { cn } from '@/lib/Utils/CssUtils';

import { useTranslation } from '@/i18n';

import { buttonVariants } from '@/registry/new-york/ui/button';

import { LanguageSelector, Logo } from '@/components';
import Link from '@/components/ui/link';

export default function () {
	const { t } = useTranslation();

	return (
		<div className="w-full blurEffect absolute top-0 left-0 z-50 flex flex-row p-5 items-center justify-between">
			<div>
				<Logo />
			</div>
			<div className="flex flex-row justify-center items-center">
				<LanguageSelector />

				<Link href="en/auth/register" className={cn(buttonVariants({ variant: 'ghost' }))}>
					{t('pages.login.signup')}
				</Link>
			</div>
		</div>
	);
}
