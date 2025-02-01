/* eslint-disable max-len */
import { BaseListResponses } from '@/services/type';

import api from '../../api';

import { GatewayCreateRequestType, GatewayRequestParamType, GatewayType } from './type';

export const gatewaysApi = api.injectEndpoints({
	endpoints: build => ({
		listGateways: build.query<BaseListResponses<GatewayType[]>, { company: string, project: string, namespace: string }>({
			providesTags: ['list-gateway'],
			query: ({ company, project, namespace }) => ({ url: `/gateway/${company}/${project}/${namespace}` }),
		}),
		getGateway: build.query<BaseListResponses<GatewayType>, GatewayRequestParamType>({
			query: ({
				company, project, namespace, gateway,
			}) => ({ url: `/gateway/${company}/${project}/${namespace}/${gateway}`, method: 'GET' }),
		}),
		createGateway: build.mutation<GatewayType, GatewayRequestParamType & { body: GatewayCreateRequestType }>({
			invalidatesTags: ['list-gateway'],
			query: ({
				company, project, namespace, body,
			}) => ({ url: `/gateway/${company}/${project}/${namespace}`, method: 'POST', body }),
		}),
		updateGateway: build.mutation<GatewayType, GatewayRequestParamType & { body: GatewayCreateRequestType }>({
			invalidatesTags: ['list-gateway'],
			query: ({
				company, project, namespace, gateway, body,
			}) => ({ url: `/gateway/${company}/${project}/${namespace}/${gateway}`, method: 'PATCH', body }),
		}),
		deleteGateway: build.mutation<GatewayType, GatewayRequestParamType>({
			invalidatesTags: ['list-gateway'],
			query: ({
				company, project, namespace, gateway,
			}) => ({ url: `/gateway/${company}/${project}/${namespace}/${gateway}`, method: 'DELETE' }),
		}),
	}),
});

export const {
	useListGatewaysQuery,
	useGetGatewayQuery,
} = gatewaysApi;
