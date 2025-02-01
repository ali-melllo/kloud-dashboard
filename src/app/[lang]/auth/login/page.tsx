import { redirect } from 'next/navigation';

import { authProviderServer } from '@/providers/auth-provider';

import { AuthLayout } from '@/components/layout/auth/index';

async function getData() {
	const { authenticated, redirectTo, error } = await authProviderServer.check();

	return {
		authenticated,
		redirectTo,
		error,
	};
}

export default async function Login() {
	const data = await getData();

	if (data.authenticated) {
		redirect(data?.redirectTo || '/');
	}

	return (
		<AuthLayout />
	);
}
