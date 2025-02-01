/* eslint-disable max-len */
import { BaseListResponses } from '@/services/type';

import api from '../../api';

import { ConfigmapRequestParamType, ConfigmapType } from './type';

export const envoirmentsApi = api.injectEndpoints({
	endpoints: build => ({
		listConfigmaps: build.query<BaseListResponses<ConfigmapType[]>, ConfigmapRequestParamType>({
			providesTags: ['list-configmap'],
			query: ({
				company, project, namespace, application,
			}) => ({ url: `/configmap/${company}/${project}/${namespace}/${application}`, method: 'GET' }),
		}),
		listBuildConfigmaps: build.query<BaseListResponses<ConfigmapType[]>, ConfigmapRequestParamType>({
			providesTags: ['list-build-configmap'],
			query: ({
				company, project, namespace, application,
			}) => ({ url: `/build-configmap/${company}/${project}/${namespace}/${application}`, method: 'GET' }),
		}),
		getConfigmap: build.query<ConfigmapType, ConfigmapRequestParamType>({
			query: ({
				company, project, namespace, configMap,
			}) => ({ url: `/configmap/${company}/${project}/${namespace}/${configMap}`, method: 'GET' }),
		}),
		createConfigmap: build.mutation<ConfigmapType, ConfigmapRequestParamType>({
			invalidatesTags: ['list-configmap'],
			query: ({
				company, project, namespace, application, ...rest
			}) => ({ url: `/configmap/${company}/${project}/${namespace}/${application}`, method: 'POST', body: { ...rest } }),
		}),
		createBuildConfigmap: build.mutation<ConfigmapType, ConfigmapRequestParamType>({
			invalidatesTags: ['list-build-configmap'],
			query: ({
				company, project, namespace, application, ...rest
			}) => ({ url: `/build-configmap/${company}/${project}/${namespace}/${application}`, method: 'POST', body: { ...rest } }),
		}),
		updateConfigmap: build.mutation<ConfigmapType, any>({
			invalidatesTags: ['list-configmap'],
			query: ({
				company, project, namespace, application, ...rest
			}) => ({ url: `/configmap/${company}/${project}/${namespace}/${application}`, method: 'PATCH', body: { ...rest } }),
		}),
		updateBuildConfigmap: build.mutation<ConfigmapType, any>({
			invalidatesTags: ['list-build-configmap'],
			query: ({
				company, project, namespace, application, ...rest
			}) => ({ url: `/build-configmap/${company}/${project}/${namespace}/${application}`, method: 'PATCH', body: { ...rest } }),
		}),
		deleteConfigmap: build.mutation<ConfigmapType, ConfigmapRequestParamType>({
			invalidatesTags: ['list-configmap'],
			query: ({
				company, project, namespace, application, key,
			}) => ({ url: `/configmap/${company}/${project}/${namespace}/${application}/${key}`, method: 'DELETE' }),
		}),
		deleteBuildConfigmap: build.mutation<ConfigmapType, ConfigmapRequestParamType>({
			invalidatesTags: ['list-build-configmap'],
			query: ({
				company, project, namespace, application, key,
			}) => ({ url: `/build-configmap/${company}/${project}/${namespace}/${application}/${key}`, method: 'DELETE' }),
		}),
	}),
});

export const {
	useListConfigmapsQuery,
	useGetConfigmapQuery,
	useListBuildConfigmapsQuery,
} = envoirmentsApi;
