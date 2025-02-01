'use client';

import React from 'react';

import { appConst } from '@/configs';

import SettingLayout from '@/components/templates/SettingLayout';

type PropTypes = {
	children: React.ReactNode;
	modal: React.ReactNode;
	params: {
		company: string, project: string, namespace: string, application: string
	}
}

export default function ApplicationSettingsLayout({
	children,
	modal,
	params: {
		company, project, namespace, application,
	},
}: PropTypes) {
	return (
		<SettingLayout
			headTitle="settings"
			navBarItems={appConst.applicationSettingItems.map(item => ({
				...item,
				href: `/${company}/project/${project}/${namespace}/${application}/settings/${item.key}`,
			}))}
			activePageRange={8}
		>
			{children}
			{modal}
		</SettingLayout>
	);
}
