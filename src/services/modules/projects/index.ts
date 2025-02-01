/* eslint-disable max-len */
import { BaseListResponses } from '@/services/type';

import api from '../../api';

import { ProjectRequestParamType, ProjectType } from './type';

export const projectsApi = api.injectEndpoints({
	endpoints: build => ({

		listProject: build.query<BaseListResponses<ProjectType[]>, { company: string }>({
			providesTags: ['list-project'],
			query: ({ company }) => ({ url: `/project/${company}/` }),
		}),
		getProject: build.query<ProjectType, ProjectRequestParamType>({
			query: ({ company, project }) => ({ url: `/project/${company}/${project}` }),
		}),
		deleteProject: build.mutation<ProjectType, ProjectRequestParamType>({
			invalidatesTags: ['list-project'],
			query: ({ company, project }) => ({ url: `/project/${company}/${project}`, method: 'DELETE' }),
		}),
		createProject: build.mutation<ProjectType, ProjectRequestParamType>({
			invalidatesTags: ['list-project'],
			query: ({ company, project, ...rest }) => ({ url: `/project/${company}/${project}`, body: { ...rest }, method: 'POST' }),
		}),
	}),
});

export const {
	useListProjectQuery, useGetProjectQuery,
} = projectsApi;
