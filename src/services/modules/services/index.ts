/* eslint-disable max-len */
import { BaseListResponses } from '@/services/type';

import api from '../../api';

import {
	MetaServiceItemType, MetaServiceRequestParamType, ServiceRequestParamType, ServiceType,
} from './type';

export const servicesApi = api.injectEndpoints({
	endpoints: build => ({
		listService: build.query<BaseListResponses<ServiceType[]>, { company: string, project: string, namespace: string }>({
			providesTags: ['list-service'],
			query: ({ company, project, namespace }) => ({ url: `/service/${company}/${project}/${namespace}` }),
		}),
		getService: build.query({
			query: ({
				company, project, namespace, service,
			}) => ({ url: `/service/${company}/${project}/${namespace}/${service}` }),
		}),
		createService: build.mutation<ServiceType, ServiceRequestParamType>({
			invalidatesTags: ['list-service'],
			query: ({
				company, project, namespace, body,
			}) => ({ url: `/service/${company}/${project}/${namespace}`, method: 'POST', body }),
		}),
		deleteService: build.mutation<ServiceType, ServiceRequestParamType>({
			invalidatesTags: ['list-service'],
			query: ({
				company, project, namespace, service,
			}) => ({ url: `/service/${company}/${project}/${namespace}/${service}`, method: 'DELETE' }),
		}),
		stopService: build.mutation<ServiceType, ServiceRequestParamType>({
			invalidatesTags: ['list-service'],
			query: ({
				company, project, namespace, service,
			}) => ({ url: `/service/${company}/${project}/${namespace}/${service}/stop`, method: 'POST' }),
		}),
		startService: build.mutation<ServiceType, ServiceRequestParamType>({
			invalidatesTags: ['list-service'],
			query: ({
				company, project, namespace, service,
			}) => ({ url: `/service/${company}/${project}/${namespace}/${service}/start`, method: 'POST' }),
		}),
		getMetaService: build.query<BaseListResponses<MetaServiceItemType[]>, MetaServiceRequestParamType>({
			query: ({
				company, project, namespace,
			}) => ({ url: `/application-meta/${company}/${project}/${namespace}` }),
		}),
	}),
});

export const {
	useListServiceQuery,
	useGetServiceQuery,
	useGetMetaServiceQuery,
} = servicesApi;
