'use client';

import React from 'react';
import { Folder, Upload } from '@phosphor-icons/react';

import { appConst } from '@/configs';

import { useTranslation } from '@/i18n';

import TitleCard from '@/components/templates/TitleCard';

type PropTypes = {
	children: React.ReactNode;
	modal: React.ReactNode;
}

export default function ContainerLayout({
	children,
	modal,
}: PropTypes) {
	const { t } = useTranslation();

	return (
		<>
			<TitleCard
				activePageRange={8}
				navBarItems={appConst.TerminalNavBarItems}
				buttons={[
					{
						key: 'files',
						label: t('pages.applications.uploadFile'),
						href: 'new',
						icon: <Upload />,
					},
					{
						key: 'files',
						label: t('pages.applications.newDirectory'),
						href: 'newDirectory',
						icon: <Folder />,
					},
				]}
			/>
			{children}
			{modal}
		</>
	);
}
