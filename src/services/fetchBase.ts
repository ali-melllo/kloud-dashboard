import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { apiDefaultConfig, appConfig } from '@/configs';
import { UrlUtils } from '@/lib/Utils';
import { showToast } from '@/lib/Utils/ToastUtils';

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
	async config => {
		const newConfig = { ...config };
		const auth = Cookies.get('auth');
		if (auth && config?.headers) {
			const { token } = JSON.parse(auth);
			newConfig.headers.Authorization = `Bearer ${token}`;
		}
		return newConfig;
	},
	error => {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	async config => config.data,
	error => {
		if (error.response.status === 401 || error.response.data.code === 403) {
			Cookies.remove('auth', { path: '/' });
			showToast({
				title: 'Unauthorized Access',
				variant: 'default',
			});
			// if (!window.location.pathname.includes('auth')) window.location.href = '/auth/login';
		}
		return Promise.reject(error);
	},
);

const fetchBase: BaseQueryFn<
	FetchArgs,
	unknown,
	FetchBaseQueryError
> = async args => {
	const {
		url, method = 'GET', body, params,
	} = args;

	let finalUrl = `${appConfig.API_URL}${url}`;
	finalUrl = UrlUtils.makeUrlWithParams(finalUrl, params);

	// Check if the body contains a file, and set headers accordingly
	const headers = { ...apiDefaultConfig.headerMetadata };
	if (body instanceof FormData) {
		headers['Content-Type'] = 'multipart/form-data';
	}
	else {
		headers['Content-Type'] = 'application/json';
	}

	try {
		const response = await axiosInstance.request({
			method,
			url: finalUrl,
			headers,
			data: body,
		});

		return { data: response };
	}
	catch (error: any) {
		if (error.response) {
			showToast({
				title: (`${error.response.data.msg || error.message} 
					    ${error.response.data.code || error.response.status}`),
				description: `${error.response.data?.data}`,
				variant: 'default',
			});
			throw {
				error: {
					data: error.response.data.msg || error.message,
					status: error.response.data.code || error.response.status,
				},
			};
		}

		if (error.request) {
			console.log('Unhandled Error', error.request);
			throw error.request;
		}

		console.log('Unhandled Error', error.message);
		throw error.message;
	}
};

export default fetchBase;
