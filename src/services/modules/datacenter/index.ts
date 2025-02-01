/* eslint-disable max-len */
import { BaseListResponses } from '@/services/type';

import api from '../../api';

import { DataCenterRequestParamType, DataCenterType } from './type';

export const dataCenterApi = api.injectEndpoints({
	endpoints: build => ({
		listDateCenter: build.query<BaseListResponses<DataCenterType[]>, DataCenterRequestParamType>({
			providesTags: ['list-data-center'],
			query: ({ company }) => ({ url: `/datacenter/${company}` }),
		}),
	}),
});

export const {
	useListDateCenterQuery,
} = dataCenterApi;
