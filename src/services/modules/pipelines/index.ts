/* eslint-disable max-len */
import { BaseListResponses, BaseResponses } from '@/services/type';

import api from '../../api';

import { PipelineRequestParamType, PipelineType } from './type';

export const pipelinesApi = api.injectEndpoints({
	endpoints: build => ({
		listPipeline: build.query<BaseListResponses<PipelineType[]>, { company: string, project: string, namespace: string, application : string }>({
			query: ({
				company, project, namespace, application,
			}) => ({ url: `/pipelines/${company}/${project}/${namespace}/${application}` }),
		}),
		getPipeline: build.query<BaseResponses<PipelineType>, PipelineRequestParamType>({
			query: ({
				company, project, namespace, pipeline, application,
			}) => ({ url: `/pipelines/${company}/${project}/${namespace}/${application}/${pipeline}` }),
		}),
		logPipeline: build.query<BaseResponses<{ log: string }>, PipelineRequestParamType & { stage: string }>({
			query: ({
				company, project, namespace, pipeline, stage, application,
			}) => ({ url: `/pipelines/${company}/${project}/${namespace}/${application}/${pipeline}/${stage}/logs` }),
		}),
		retryPipeline: build.mutation<BaseResponses<{ id: string }>, PipelineRequestParamType>({
			query: ({
				company, project, namespace, pipeline, application,
			}) => ({ url: `/pipelines/${company}/${project}/${namespace}/${application}/${pipeline}/retry`, method: 'POST' }),
		}),
		killPipeline: build.mutation<BaseResponses<{ id: string }>, PipelineRequestParamType>({
			query: ({
				company, project, namespace, pipeline, application,
			}) => ({ url: `/pipelines/${company}/${project}/${namespace}/${application}/${pipeline}/kill`, method: 'POST' }),
		}),
	}),
});

export const {
	useListPipelineQuery, useGetPipelineQuery, useLogPipelineQuery,
} = pipelinesApi;
