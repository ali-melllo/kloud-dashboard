import React, { HTMLAttributes, useMemo } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { useAppSelector } from '@/store/hooks';

import { appConst } from '@/configs';
import { cn } from '@/lib/Utils/CssUtils';

import { useTranslation } from '@/i18n';

import MainNavBarSelector from '@/components/selectors/MainNavBarSelector';

export function MainNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
	const {
		lang, company, project, namespace, application,
	} = useParams();
	const pathname = usePathname();
	const { t } = useTranslation();
	const activePage = useMemo(() => pathname.split('/')[7], [pathname]);
	const { application: applicationData } = useAppSelector(state => state.app);

	if (!application) {
		return null;
	}

	return (
		<>
			<nav className={cn('hidden md:flex flex-wrap gap-y-3 lg:gap-y-0 items-center gap-x-4 lg:gap-x-6', className)} {...props}>
				{/* <BranchSelector onChange={onBranchChange} /> */}
				{appConst.projectNavbarItems.map(item => ((applicationData && applicationData.type === 'template' && item.key === 'pipeline') ? null : (
					<Link
						key={item.key}
						href={`/${lang}/${company}/project/${project}/${namespace}/${application}/${item.key}/list`}
						className={cn(
							'text-sm font-medium transition-colors hover:text-primary',
							item.key !== activePage ? 'text-muted-foreground' : '',
						)}
					>
						{t(`navbar.${item.key}`)}
					</Link>
				)))}
			</nav>
			<MainNavBarSelector />
		</>
	);
}
