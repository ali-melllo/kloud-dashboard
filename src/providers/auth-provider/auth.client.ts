'use client';

import Cookies from 'js-cookie';

import { AuthBindings } from '@refinedev/core';

export const authProviderClient: AuthBindings = {
	logout: async () => {
		Cookies.remove('auth', { path: '/' });
		return {
			success: true,
			redirectTo: '/auth/login',
		};
	},
	check: async () => {
		const auth = Cookies.get('auth');
		if (auth) {
			return {
				authenticated: true,
			};
		}

		return {
			authenticated: false,
			logout: true,
			redirectTo: '/auth/login',
		};
	},
	getPermissions: async () => {
		const auth = Cookies.get('auth');
		if (auth) {
			const parsedUser = JSON.parse(auth);
			return parsedUser.roles;
		}
		return null;
	},
	getIdentity: async () => {
		const auth = Cookies.get('auth');
		if (auth) {
			const parsedUser = JSON.parse(auth);
			return parsedUser;
		}
		return null;
	},
	onError: async error => {
		if (error.response?.status === 401) {
			return {
				logout: true,
			};
		}

		return { error };
	},
};
