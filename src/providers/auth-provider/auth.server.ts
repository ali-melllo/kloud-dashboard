import { cookies } from 'next/headers';

import { AuthBindings } from '@refinedev/core';

export const authProviderServer: Pick<AuthBindings, 'check'> = {
	check: async () => {
		const cookieStore = cookies();
		const auth = cookieStore.get('auth');

		if (auth) {
			const userData = JSON.parse(auth.value);
			return {
				redirectTo: `/${userData.company}/project/list`,
				authenticated: true,
			};
		}

		return {
			authenticated: false,
			logout: true,
			redirectTo: '/auth/login',
		};
	},
};
