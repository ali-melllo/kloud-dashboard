/* eslint-disable max-len */
import { BaseListResponses } from '@/services/type';

import api from '../../api';

import { PvcRequestParamType, PvcType } from './type';

export const volumeApi = api.injectEndpoints({
	endpoints: build => ({
		listPvc: build.query<BaseListResponses<PvcType[]>, PvcRequestParamType>({
			providesTags: ['list-pvc'],
			query: ({
				company, project, namespace, application,
			}) => ({ url: `/pvc/${company}/${project}/${namespace}${application ? `?application=${application}` : ''}` }),
		}),
		createPvc: build.mutation<PvcType, PvcRequestParamType>({
			invalidatesTags: ['list-pvc'],
			query: ({
				company, project, namespace, body,
			}) => ({ url: `/pvc/${company}/${project}/${namespace}`, method: 'POST', body }),
		}),
		deletePvc: build.mutation<PvcType, PvcRequestParamType & { id : string}>({
			invalidatesTags: ['list-pvc'],
			query: ({
				company, project, namespace, id,
			}) => ({ url: `/pvc/${company}/${project}/${namespace}/${id}`, method: 'DELETE' }),
		}),
	}),
});

export const {
	useListPvcQuery,
} = volumeApi;
