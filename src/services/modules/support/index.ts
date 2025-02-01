/* eslint-disable max-len */
import { BaseListResponses } from '@/services/type';

import api from '../../api';

import { SupportRequestParamType, SupportType, TicketType } from './type';

export const supportApi = api.injectEndpoints({
	endpoints: build => ({
		listTickets: build.query<BaseListResponses<SupportType>, SupportRequestParamType>({
			providesTags: ['list-ticket'],
			query: ({ company }) => ({
				url: `/support/${company}`,
			}),
		}),
		createTicket: build.mutation<SupportType, SupportRequestParamType>({
			invalidatesTags: ['list-ticket'],
			query: ({
				company, body,
			}) => ({
				url: `/support/${company}`, method: 'POST', body,
			}),
		}),
		getTicket: build.query<BaseListResponses<TicketType>, SupportRequestParamType>({
			providesTags: ['get-ticket'],
			query: ({
				company, id,
			}) => ({ url: `/support/${company}/${id}`, method: 'GET' }),
		}),
		getTicketCategory: build.query<BaseListResponses<SupportType[]>, SupportRequestParamType>({
			query: () => ({ url: '/support', method: 'GET' }),
		}),
		updateTicket: build.mutation<SupportType, SupportRequestParamType>({
			invalidatesTags: ['get-ticket'],
			query: ({
				company, body, id,
			}) => ({ url: `/support/${company}/${id}`, method: 'PATCH', body }),
		}),
	}),
});

export const {
	useListTicketsQuery,
	useGetTicketQuery,
	useGetTicketCategoryQuery,
} = supportApi;
