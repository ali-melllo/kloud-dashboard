/* eslint-disable max-len */
import { BaseListResponses } from '@/services/type';

import api from '../../api';
import { ApplicationFileItemType, MetaServiceItemType } from '../services/type';

import {
	ApplicationFilesRequestParamType,
	ApplicationInstallRequestParamType, ApplicationListType, ApplicationRequestParamType, ApplicationType,
} from './type';

export const applicationsApi = api.injectEndpoints({
	endpoints: build => ({
		listApplication: build.query<BaseListResponses<ApplicationListType>, { company: string, project: string, namespace: string }>({
			providesTags: (result, error, args) => [{ type: 'Application', application: args.namespace }],
			query: ({ company, project, namespace }) => ({ url: `/application/${company}/${project}/${namespace}` }),
		}),
		getApplication: build.query<BaseListResponses<ApplicationType>, ApplicationRequestParamType>({
			providesTags: ['application-info'],
			query: ({
				company, project, namespace, application,
			}) => ({ url: `/application/${company}/${project}/${namespace}/${application}` }),
		}),
		logApplication: build.query<ApplicationType, ApplicationRequestParamType>({
			providesTags: (result, error, args) => [{ type: 'Application', application: args.application }],
			query: ({
				company, project, namespace, application,
			}) => ({ url: `/application/${company}/${project}/${namespace}/${application}` }),
		}),
		createApplication: build.mutation<ApplicationType, ApplicationRequestParamType>({
			invalidatesTags: ['Application'],
			query: ({
				company, project, namespace, body,
			}) => ({ url: `/application/${company}/${project}/${namespace}`, method: 'POST', body }),
		}),

		startApplication: build.mutation<ApplicationType, ApplicationRequestParamType>({
			invalidatesTags: ['application-info'],
			query: ({
				company, project, namespace, application,
			}) => ({ url: `/application/${company}/${project}/${namespace}/${application}/start`, method: 'POST' }),
		}),
		installApplication: build.mutation<ApplicationType, ApplicationInstallRequestParamType>({
			invalidatesTags: (result, error, args) => [{ type: 'Application', application: args.application }],
			query: ({
				company, project, namespace, application, body,
			}) => ({ url: `/application/${company}/${project}/${namespace}/${application}/install`, method: 'POST', body }),
		}),
		getApplicationInstallValues: build.query<BaseListResponses<MetaServiceItemType>, ApplicationRequestParamType>({
			query: ({
				company, project, namespace, application,
			}) => ({ url: `/application/${company}/${project}/${namespace}/${application}/install` }),
		}),
		stopApplication: build.mutation<ApplicationType, ApplicationRequestParamType>({
			invalidatesTags: ['application-info'],
			query: ({
				company, project, namespace, application,
			}) => ({ url: `/application/${company}/${project}/${namespace}/${application}/stop`, method: 'POST' }),
		}),
		deleteApplication: build.mutation<ApplicationType, ApplicationRequestParamType>({
			invalidatesTags: ['Application'],
			query: ({
				company, project, namespace, application,
			}) => ({ url: `/application/${company}/${project}/${namespace}/${application}`, method: 'DELETE' }),
		}),
		tempAppConfig: build.query<BaseListResponses<MetaServiceItemType>, ApplicationRequestParamType>({
			query: ({
				company, project, namespace, application,
			}) => ({ url: `/temp-app-config/${company}/${project}/${namespace}/${application}` }),
		}),
		updateTempAppConfig: build.mutation<ApplicationType, ApplicationRequestParamType>({
			query: ({
				company, project, namespace, application, ...rest
			}) => ({ url: `/temp-app-config/${company}/${project}/${namespace}/${application}`, method: 'PATCH', body: { ...rest } }),
		}),
		getApplicationFiles: build.query<BaseListResponses<ApplicationFileItemType>, ApplicationFilesRequestParamType>({
			// providesTags: ['list-application-files'],
			query: ({
				company, project, namespace, application, meta, container, body,
			}) => ({ url: `/application-file-manager/${company}/${project}/${namespace}/${application}/${meta}/${container}`, method: 'POST', body: { ...body } }),
		}),
		uploadApplicationFile: build.mutation<BaseListResponses<ApplicationFileItemType>, ApplicationFilesRequestParamType>({
			// invalidatesTags: ['list-application-files'],
			query: ({
				company, project, namespace, application, meta, container, body,
			}) => {
				const formData = new FormData();
				Object.keys(body).forEach(key => {
					formData.append(key, body[key]);
				});
				return {
					url: `/application-file-uploader/${company}/${project}/${namespace}/${application}/${meta}/${container}`,
					method: 'POST',
					body: formData,
				};
			},
		}),
	}),
});

export const {
	useListApplicationQuery,
	useGetApplicationQuery,
	useCreateApplicationMutation,
	useStartApplicationMutation,
	useStopApplicationMutation,
	useTempAppConfigQuery,
	useGetApplicationInstallValuesQuery,
	useGetApplicationFilesQuery,
} = applicationsApi;
