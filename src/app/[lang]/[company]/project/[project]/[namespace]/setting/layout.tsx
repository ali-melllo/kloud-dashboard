'use client';

import React from 'react';

import { appConst } from '@/configs';

import SettingLayout from '@/components/templates/SettingLayout';

type PropTypes = {
	children: React.ReactNode;
	modal: React.ReactNode;
	params: {
		lang: string, company: string, project: string, namespace: string
	}
}

export default function NamespaceSettingLayout({
	children,
	modal,
	params: {
		lang, company, project, namespace,
	},
}: PropTypes) {
	return (
		<SettingLayout
			headTitle="settings"
			navBarItems={appConst.settingNavbarItems.map(item => ({
				...item,
				href: `/${lang}/${company}/project/${project}/${namespace}/setting/${item.key}${item.key === 'namespace' ? '/list' : ''}`,
			}))}
			activePageRange={7}
		>
			{children}
			{modal}
		</SettingLayout>
	);
}
