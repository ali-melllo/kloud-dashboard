import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import fetchBase from './fetchBase';

const mutex = new Mutex();

const fetchBaseWithInterceptor: BaseQueryFn<
	FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	const result = await fetchBase(args, api, extraOptions);

	// if (result.error && result.error.status === 401) {
	// 	if (mutex.isLocked()) {
	// 		await mutex.waitForUnlock();
	// 		result = await fetchBase(args, api, extraOptions);
	// 	}
	// 	else {
	// 		const release = await mutex.acquire();

	// 		try {
	// 			const { tokens: { refresh } } = (api.getState() as RootState).auth;

	// 			if (refresh) {
	// 				const refreshResult = await fetchBase({
	// 					url: apiEndpoints.refreshToken.url, method: 'POST', body: { refresh },
	// 				}, api, { ...extraOptions, bypassToken: true });

	// 				if (refreshResult.data) {
	// 					await api.dispatch(updateTokens({ tokens: refreshResult.data }));
	// 					result = await fetchBase(args, api, extraOptions);
	// 				}
	// 				else {
	// 					api.dispatch(logout());
	// 				}
	// 			}
	// 			else {
	// 				api.dispatch(logout());
	// 			}
	// 		}
	// 		finally {
	// 			release();
	// 		}
	// 	}
	// }

	return result;
};

const api = createApi({
	baseQuery: fetchBaseWithInterceptor,
	// keepUnusedDataFor: 0,
	tagTypes: [
		'list-project', 'new-project', 'edit-project', 'delete-project',
		'list-namespace', 'new-namespace', 'edit-namespace', 'delete-namespace',
		'list-gateway', 'new-gateway', 'edit-gateway', 'delete-gateway',
		'Application', 'application-info',
		'list-service', 'new-service', 'edit-service', 'delete-service',
		'list-configmap', 'new-configmap', 'edit-configmap', 'delete-configmap',
		'list-build-configmap', 'new-build-configmap', 'edit-build-configmap', 'delete-build-configmap',
		'list-data-center',
		'get-user',
		'list-ticket', 'get-ticket',
		'list-application-files',
		'list-pvc'
	],
	endpoints: () => ({}),
});

export default api;
