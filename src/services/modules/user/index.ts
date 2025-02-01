import Cookies from 'js-cookie';
// import { register } from 'module';
import { redirect } from 'next/navigation';

import api from '../../api';

import { UserRequestParamType, UserType } from './type';

export async function navigate(url: string) {
	redirect(url);
}

export const userApi = api.injectEndpoints({
	endpoints: build => ({
		// ================ Authentication
		login: build.mutation({
			query: body => ({ url: '/token', method: 'POST', body }),
			transformResponse: async (response:{data:{}}) => {
				await Cookies.set('auth', JSON.stringify(response.data), {
					sameSite: 'strict',
					expires: 30, // days
					path: '/',
				});
				return response.data;
			},
		}),
		register: build.mutation({
			query: body => ({
				url: `/register/${body.company}`,
				method: 'POST',
				body,
			}),
			transformResponse: async (response:{data:{}}) => {
				await Cookies.set('auth', JSON.stringify(response.data), {
					sameSite: 'strict',
					expires: 30, // days
					path: '/',
				});
				return response.data;
			},
		}),
		getUser: build.query<UserType, UserRequestParamType>({
			providesTags: ['get-user'],
			query: ({
				company,
			}) => ({ url: `/user/${company}` }),
		}),

		updateUser: build.mutation<UserType, UserRequestParamType>({
			invalidatesTags: ['get-user'],
			query: ({
				company, body,
			}) => ({ url: `/user/${company}`, method: 'PATCH', body }),
		}),
	}),
});

export const { useRegisterMutation, useLoginMutation, useGetUserQuery } = userApi;
