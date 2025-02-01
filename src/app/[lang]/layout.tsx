import React, { Suspense } from 'react';
import { dir } from 'i18next';
import { Metadata } from 'next';

import ProgressBarProvider from '@/providers/progress-provider/ProgressProvider';

import ReduxProvider from '@/store/ReduxProvider';

import { Toaster } from '@/registry/new-york/ui/toaster';

import { RefineProvider } from './refine';

import '@/styles/global.css';

export const metadata: Metadata = {
	title: 'Kloud',
	description: 'by Kloud team',
	icons: {
		icon: '/favicon.ico',
	},
};

type PropTypes = Readonly<{
	children: React.ReactNode;
	params: {
		lang: string;
	}
}>

export default function RootLayout({ children, params: { lang } }: PropTypes) {
	return (
		<html lang={lang} dir={dir(lang)}>
			<head>
			    <link rel="stylesheet" href="/path/to/Dana-font.css" media={dir(lang) === 'rtl' ? 'all' : 'none'} />
			    <link rel="stylesheet" href="/path/to/Ubuntu-font.css" media={dir(lang) !== 'rtl' ? 'all' : 'none'} />
				<link
					href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<Suspense>
					<RefineProvider>
						<ReduxProvider>
							<ProgressBarProvider>
								{children}
							</ProgressBarProvider>
							<Toaster />
						</ReduxProvider>
					</RefineProvider>
				</Suspense>
			</body>
		</html>
	);
}
