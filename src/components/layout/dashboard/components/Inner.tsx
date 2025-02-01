'use client';

import React, {
	PropsWithChildren, useCallback,
} from 'react';
import { Pen, Plus } from '@phosphor-icons/react';
import { dir } from 'i18next';
import Cookies from 'js-cookie';
import { useParams } from 'next/navigation';

import { appConst } from '@/configs';

import { useTranslation } from '@/i18n';

import { ResizablePanel, ResizablePanelGroup } from '@/registry/new-york/ui/resizable';
import { TooltipProvider } from '@/registry/new-york/ui/tooltip';

import TitleCard from '@/components/templates/TitleCard';

import { Header } from './Header';

type PropTypes = PropsWithChildren & {
	defaultLayout: number[] | undefined;
}

export function Inner({
	defaultLayout = [14, 86],
	children,
}: PropTypes) {
	const { lang, project, company } = useParams<{lang:string; project:string; company:string;}>();
	const { t } = useTranslation();

	const onLayout = useCallback((sizes: number[]) => {
		Cookies.set('dashboard-panel-layout', JSON.stringify(sizes), { path: '/' });
	}, []);

	return (
		<TooltipProvider delayDuration={0}>
			<ResizablePanelGroup
				direction="horizontal"
				onLayout={onLayout}
				className={`h-full min-h-screen items-stretch ${dir(lang) === 'rtl' ? 'font-[Dana]' : 'font-[Ubuntu]'}`}
			>
				<ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
					<Header />
					<div className="h-full xl:px-[10vw] lg:px-32 sm:px-10 px-5 flex-1 space-y-4 py-6 bg-background-muted">
						{!project
							&&							(
								<TitleCard
									activePageRange={3}
									navBarItems={appConst.CompanyNavBarItems}
									buttons={[
										{
											key: 'project',
											href: `/${lang}/${company}/project/new`,
											label: t('pages.projects.create'),
											icon: <Plus />,
										},
										{
											key: 'tickets',
											href: `/${lang}/${company}/tickets/new`,
											label: t('tickets.create'),
											icon: <Plus />,
										},
										{
											key: 'profile',
											href: `/${lang}/${company}/profile/update`,
											label: t('pages.profile.update'),
											icon: <Pen />,
										},
									]}
									forms={[{
										key: 'project',
										blocks: [{
											type: 'input',
											name: 'project',
											inputs: [{
												name: 'name',
												type: 'text',
												placeholder: `${t('pages.projects.search')} ...`,
												defaultValue: '',
												rules: {},
											}],
										}],
										submitLabel: t('pages.projects.search'),
										api: '',
									}]}
								/>
							)}
						{children}
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</TooltipProvider>
	);
}
