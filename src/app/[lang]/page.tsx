import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { authProviderServer } from '@/providers/auth-provider';

import Landing from './landing/page';

type PropTypes = {
	params: {
		lang:string;
	}
}

export default async function IndexPage({
	params: {
		lang,
	},
}: PropTypes) {
	// const { authenticated, redirectTo } = await authProviderServer.check();

	// if (!authenticated) {
	// 	return redirect(redirectTo || '/auth/login');
	// }
	// if (redirectTo) {
	// 	redirect(redirectTo);
	// }

	console.log(lang);
	return (
		<Landing />
	);
}
