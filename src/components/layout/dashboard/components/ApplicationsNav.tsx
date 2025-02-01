import React, {
	HTMLAttributes, useMemo,
} from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { appConst } from '@/configs';
import { cn } from '@/lib/Utils/CssUtils';

import { useTranslation } from '@/i18n';

import AppNavBarSelector from '@/components/selectors/AppNavBarSelector';

export function ApplicationNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
	const {
		lang, company, project, namespace, application,
	} = useParams();
	const pathname = usePathname();
	const { t } = useTranslation();
	const activePage = useMemo(() => pathname.split('/')[6], [pathname]);

	if (!namespace || application) {
		return null;
	}

	return (
		<>
			<nav className={cn('hidden md:flex flex-wrap gap-y-3 lg:gap-y-0  items-center w-full gap-x-4 lg:gap-x-6', className)} {...props}>
				{appConst.applicationNavbarItems.map(item => (
					<Link 
					    key={item.key}
						href={`/${lang}/${company}/project/${project}/${namespace}/${item.key}${item.key === 'setting' ? '/general' : '/list'}`}
						className={
							cn(
								'text-sm font-medium transition-colors hover:text-primary',
								(item.key !== activePage) ? 'text-muted-foreground' : '',
							)
						}
					>
						{t(`navbar.${item.key}`)}
					</Link>
				))}
			</nav>
			<AppNavBarSelector />
		</>
	);
}
