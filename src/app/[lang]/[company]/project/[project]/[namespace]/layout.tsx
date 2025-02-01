'use client';

import React from 'react';
import { Plus } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';

import { appConst } from '@/configs';

import { useTranslation } from '@/i18n';

import TitleCard from '@/components/templates/TitleCard';

type PropTypes = {
	children: React.ReactNode;
	modal: React.ReactNode;
	params: {
		company: string;
		project: string;
		namespace: String;
		lang:string;
	}
}

export default function NamespaceLayout({
	children,
	modal,
	params: {
		company,
		project,
		namespace,
		lang,
	},
}: PropTypes) {
	const { t } = useTranslation();
	const path = usePathname();
	return (
		<>
			<TitleCard
				hideOnKey={['setting']}
				activePageRange={6}
				navBarItems={appConst.applicationNavbarItems}
				buttons={
					path.includes('gateways/list')
						? [
							{
								key: 'overview',
								href: `/${lang}/${company}/project/${project}/${namespace}/new`,
								label: t('pages.applications.new'),
								icon: <Plus />,
							},
							{
								key: 'gateways',
								href: `/${lang}/${company}/project/${project}/${namespace}/gateways/new`,
								label: t('pages.gateways.new'),
								icon: <Plus />,
							},

						] : [
							{
								key: 'overview',
								href: `/${lang}/${company}/project/${project}/${namespace}/new`,
								label: t('pages.applications.new'),
								icon: <Plus />,
							},
						]
				}
				forms={[{
					key: 'overview',
					blocks: [{
						type: 'input',
						name: 'application',
						inputs: [{
							name: 'name',
							type: 'text',
							placeholder: `${t('pages.applications.search')} ...`,
							defaultValue: '',
							rules: {},
						}],
					}],
					submitLabel: t('pages.applications.search'),
					api: '',
				}]}
			/>

			{children}
			{modal}
		</>
	);
}
