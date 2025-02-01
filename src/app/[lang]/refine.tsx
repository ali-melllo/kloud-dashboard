import React, { PropsWithChildren } from 'react';

import { Refine } from '@refinedev/core';
import routerProvider from '@refinedev/nextjs-router';

import { authProviderClient } from '@/providers/auth-provider';
import { dataProvider } from '@/providers/data-provider';
import { notificationProvider } from '@/providers/notificationProvider';

import { Toaster } from '@/registry/new-york/ui/sonner';

import { ThemeProvider } from '@/styles/ThemeProvider';

type Props = {
};

export const RefineProvider = ({ children }: PropsWithChildren<Props>) => {
	return (
		<Refine
			routerProvider={routerProvider}
			authProvider={authProviderClient}
			notificationProvider={notificationProvider}
			dataProvider={dataProvider}
			options={{
				warnWhenUnsavedChanges: true,
				useNewQueryKeys: true,
			}}
		>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				enableSystem
				disableTransitionOnChange
			>
				<Toaster />
				{children}
			</ThemeProvider>
		</Refine>
	);
};
