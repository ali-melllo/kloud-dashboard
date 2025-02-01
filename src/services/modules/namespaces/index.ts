/* eslint-disable max-len */
import { BaseListResponses } from '@/services/type';

import api from '../../api';

import { NameSpaceRequestParamType, NameSpaceType } from './type';

export const namespacesApi = api.injectEndpoints({
	endpoints: build => ({

		listNamespace: build.query<BaseListResponses<NameSpaceType[]>, NameSpaceRequestParamType>({
			providesTags: ['list-namespace'],
			query: ({ company, project }) => ({ url: `/namespace/${company}/${project}` }),
		}),
		createNamespace: build.mutation<NameSpaceType, NameSpaceRequestParamType>({
			invalidatesTags: ['list-namespace'],
			query: ({
				company, project, ...rest
			}) => ({ url: `/namespace/${company}/${project}`, method: 'POST', body: { ...rest } }),
		}),
		deleteNamespace: build.mutation<NameSpaceType, NameSpaceRequestParamType>({
			invalidatesTags: ['list-namespace'],
			query: ({ company, project, namespace }) => ({ url: `/namespace/${company}/${project}/${namespace}`, method: 'DELETE' }),
		}),
		downloadKubeCtl: build.query<BaseListResponses<NameSpaceType[]>, NameSpaceRequestParamType>({
			query: ({ company, project, namespace }) => ({ url: `/namespace/${company}/${project}/${namespace}/kube_ctl` }),
		}),
	}),
});

export const {
	useListNamespaceQuery,
} = namespacesApi;
