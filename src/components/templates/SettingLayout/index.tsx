import React from 'react';

import { cn } from '@/lib/Utils/CssUtils';
import { useGetActivePage } from '@/lib/Utils/hooks/useGetActivePage';

import { useTranslation } from '@/i18n';

import Link from '@/components/ui/link';
import { useParams } from 'next/navigation';
import { dir } from 'i18next';

type PropTypes = {
	navBarItems: readonly { key: string; label: string; href: string }[]
	activePageRange: number;
	children?: React.ReactNode;
	modal?: React.ReactNode;
	headTitle: string;
}

export default function SettingLayout({
	navBarItems,
	activePageRange,
	children,
	modal,
	headTitle,
}: PropTypes) {
	const activePage = useGetActivePage(navBarItems, activePageRange);
	const { t } = useTranslation();
	const { lang } = useParams<{lang: string}>();
	return (
		<div className="w-full flex flex-col lg:flex-row ">

			<nav className="flex w-full lg:w-3/12 gap-x-5 lg:gap-x-0 flex-col">
				<div>
					<h2 className="text-3xl mb-10 mr-5 lg:mr-0 font-bold tracking-tight">
						{t(`navbar.${headTitle}`)}
					</h2>
				</div>
				<div className={`lg:flex grid grid-cols-3 gap-y-3 lg:gap-y-0 text-xs py-2 lg:py-0 lg:text-base text-center ${dir(lang) === 'ltr' ? 'lg:text-left' : 'lg:text-right'}  gap-x-4 lg:gap-x-0 lg:flex-col space-y-0 lg:space-y-4`}>
					{
						navBarItems.map(item => (
							<Link
								key={item.key}
								href={item.href ? item.href : '#'}
								className={cn(
									'font-medium py-2 lg:py-0 border lg:border-none flex justify-center items-center lg:block rounded-xl transition-colors hover:text-primary',
									item.key !== activePage?.pageDetail.key ? 'text-muted-foreground' : '',
								)}
							>
								{t(`navbar.${item.key}`)}
							</Link>
						))
					}
				</div>
			</nav>
			<div className="space-y-5 mb-8 w-full mt-5 lg:mt-0 lg:w-9/12 flex justify-center">
				{children}
				{modal}
			</div>

		</div>
	);
}
