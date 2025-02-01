import React from 'react';
import { redirect } from 'next/navigation';

import { authProviderServer } from '@/providers/auth-provider';

import DashboardLayout from '@/components/layout/dashboard';

type PropTypes = {
	children: React.ReactNode;
	modal:React.ReactNode;
}

export default async function Layout({ children, modal }: PropTypes) {
	const { authenticated, redirectTo } = await authProviderServer.check();

	if (!authenticated) {
		return redirect(redirectTo || '/auth/login');
	}

	return (
		<DashboardLayout>
			{children}
			{modal}
		</DashboardLayout>
	);
}
