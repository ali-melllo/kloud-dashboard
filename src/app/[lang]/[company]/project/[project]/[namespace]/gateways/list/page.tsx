'use client';

import React, { useCallback, useMemo } from 'react';
import { ColumnDef, Row } from '@tanstack/react-table';
import { useRouter } from 'next-nprogress-bar';

import { gatewaysApi, useListGatewaysQuery } from '@/services/modules/gateways';
import { GatewayType } from '@/services/modules/gateways/type';

import { appConst } from '@/configs';
import { DateUtils } from '@/lib/Utils';

import { Badge } from '@/registry/new-york/ui/badge';
import {
	Tooltip, TooltipContent, TooltipTrigger,
} from '@/registry/new-york/ui/tooltip';

import { CopyButton, DataTable } from '@/components';
import { DataTableRowActions } from '@/components/templates/DataTable/components/DataTableRowActions';

type PropTypes = {
	params: {
		company: string, project: string, namespace: string
	}
}

export default function GatewayList({ params: { company, project, namespace } }: PropTypes) {
	const router = useRouter();
	const columns = useMemo<ColumnDef<GatewayType>[]>(() => [
		{
			header: 'Host',
			cell: ({ row }) => {
				const { id, host } = row.original;
				const [host1, ...restHost] = host;

				return (
					<div className="flex items-center justify-between gap-x-3">
						{restHost.length ? (
							<Tooltip key={`${id}-hosts`} delayDuration={0}>
								<TooltipTrigger className="flex items-center">
									<span className="font-normal text-md">
										{`${host1}, ${restHost.length} more...`}
									</span>
								</TooltipTrigger>
								<TooltipContent side="top">
									{restHost.join('\n')}
								</TooltipContent>
							</Tooltip>
						) : <span>{host1}</span>}
						<CopyButton variant="outline" className="w-6 h-6" value={restHost.length ? restHost.join('\n') : host1} />
					</div>
				);
			},
		},
		{
			header: 'Matches',
			cell: ({ row }) => {
				const { id, matches } = row.original;
				const [match1, ...restMatches] = matches;

				return (
					restMatches.length ? (
						<Tooltip key={`${id}-matches`} delayDuration={0}>
							<TooltipTrigger className="flex items-center">
								<span className="font-normal text-md">
									{`${match1}, ${restMatches.length} more...`}
								</span>
							</TooltipTrigger>
							<TooltipContent side="top">
								{restMatches.join('\n')}
							</TooltipContent>
						</Tooltip>
					) : <span>{match1}</span>
				);
			},
		},
		{
			header: 'Backends',
			cell: ({ row }) => {
				const { id, backends } = row.original;
				const [backend1, ...restBackends] = backends;

				return (
					restBackends.length ? (
						<Tooltip key={`${id}-backends`} delayDuration={0}>
							<TooltipTrigger className="flex items-center">
								<span className="font-normal text-md">
									{`${backend1}, ${restBackends.length} more...`}
								</span>
							</TooltipTrigger>
							<TooltipContent side="top">
								{restBackends.join('\n')}
							</TooltipContent>
						</Tooltip>
					) : <span>{backend1}</span>
				);
			},
		},
		{
			header: 'Filters',
			cell: ({ row }) => {
				const { id, filters } = row.original;
				const [filter1, ...restFilters] = filters;

				return (
					restFilters.length ? (
						<Tooltip key={`${id}-filters`} delayDuration={0}>
							<TooltipTrigger className="flex items-center">
								<span className="font-normal text-md">
									{`${filter1}, ${restFilters.length} more...`}
								</span>
							</TooltipTrigger>
							<TooltipContent side="top">
								{restFilters.join('\n')}
							</TooltipContent>
						</Tooltip>
					) : <span>{filter1}</span>
				);
			},
		},
		{
			header: 'Created',
			cell: ({ row }) => {
				const { create } = row.original;
				return (
					<span>{DateUtils.convertDate(create)}</span>
				);
			},
		},
		{
			header: 'Status',
			cell: ({ row }) => {
				const { status: statuses } = row.original;
				const sortedStatuses = (statuses && statuses.length > 0) ? [...statuses]?.sort() : [];

				return (
					sortedStatuses.map(status => {
						const [name, s] = status.split(': ');
						const color = appConst.gatewaysColorMap[s as 'True' | 'False'];
						return (
							<Badge key={name} variant={color} className="me-2">
								{`${name} : ${s}`}
							</Badge>
						);
					})

				);
			},
		},
		{
			header: 'Actions',
			cell: ({ row }) => (
				<DataTableRowActions
					row={row}
					items={[
						{
							label: 'Delete',
							api: gatewaysApi.endpoints.deleteGateway,
							requestParams: {
								company, project, namespace, gateway: row.original.id,
							},
						},
					]}
				/>
			),
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
	], []);

	const onRowClick = useCallback((row: Row<GatewayType>) => {
		const { id } = row.original;
		router.push(`edit/${id}`);
	}, [router]);

	const { data, error, isLoading } = useListGatewaysQuery(
		{ company, project, namespace },
		{ skip: !namespace },
	);

	const fakeData = [
		{
			id: 'string',
			host: ['https://google.com'],
			create: '2024/2/31',
			status: ['https://google.com'],
			backends: ['https://google.com'],
			hostnames: ['https://google.com'],
			filters: ['https://google.com'],
			matches: ['https://google.com'],
			// rules:[{
			// 	matches,
			// 	backends,
			// 	filters
			// }]
		},
		{
			id: 'string',
			host: ['https://google.com'],
			create: '2024/2/31',
			status: ['https://google.com'],
			backends: ['https://google.com'],
			hostnames: ['https://google.com'],
			filters: ['https://google.com'],
			matches: ['https://google.com'],
			// rules:[{
			// 	matches,
			// 	backends,
			// 	filters
			// }]
		},
		{
			id: 'string',
			host: ['https://google.com'],
			create: '2024/2/31',
			status: ['https://google.com'],
			backends: ['https://google.com'],
			hostnames: ['https://google.com'],
			filters: ['https://google.com'],
			matches: ['https://google.com'],
			// rules:[{
			// 	matches,
			// 	backends,
			// 	filters
			// }]
		},
		{
			id: 'string',
			host: ['https://google.com'],
			create: '2024/2/31',
			status: ['https://google.com'],
			backends: ['https://google.com'],
			hostnames: ['https://google.com'],
			filters: ['https://google.com'],
			matches: ['https://google.com'],
			// rules:[{
			// 	matches,
			// 	backends,
			// 	filters
			// }]
		},
		{
			id: 'string',
			host: ['https://google.com'],
			create: '2024/2/31',
			status: ['https://google.com'],
			backends: ['https://google.com'],
			hostnames: ['https://google.com'],
			filters: ['https://google.com'],
			matches: ['https://google.com'],
			// rules:[{
			// 	matches,
			// 	backends,
			// 	filters
			// }]
		},
		{
			id: 'string',
			host: ['https://google.com'],
			create: '2024/2/31',
			status: ['https://google.com'],
			backends: ['https://google.com'],
			hostnames: ['https://google.com'],
			filters: ['https://google.com'],
			matches: ['https://google.com'],
			// rules:[{
			// 	matches,
			// 	backends,
			// 	filters
			// }]
		},
		{
			id: 'string',
			host: ['https://google.com'],
			create: '2024/2/31',
			status: ['https://google.com'],
			backends: ['https://google.com'],
			hostnames: ['https://google.com'],
			filters: ['https://google.com'],
			matches: ['https://google.com'],
			// rules:[{
			// 	matches,
			// 	backends,
			// 	filters
			// }]
		},
		{
			id: 'string',
			host: ['https://google.com'],
			create: '2024/2/31',
			status: ['https://google.com'],
			backends: ['https://google.com'],
			hostnames: ['https://google.com'],
			filters: ['https://google.com'],
			matches: ['https://google.com'],
			// rules:[{
			// 	matches,
			// 	backends,
			// 	filters
			// }]
		},
		{
			id: 'string',
			host: ['https://google.com'],
			create: '2024/2/31',
			status: ['https://google.com'],
			backends: ['https://google.com'],
			hostnames: ['https://google.com'],
			filters: ['https://google.com'],
			matches: ['https://google.com'],
			// rules:[{
			// 	matches,
			// 	backends,
			// 	filters
			// }]
		},
		{
			id: 'string',
			host: ['https://google.com'],
			create: '2024/2/31',
			status: ['https://google.com'],
			backends: ['https://google.com'],
			hostnames: ['https://google.com'],
			filters: ['https://google.com'],
			matches: ['https://google.com'],
			// rules:[{
			// 	matches,
			// 	backends,
			// 	filters
			// }]
		},

	];

	return (
		<div className="h-full w-full">
			<DataTable
				onRowClick={onRowClick}
				error={error}
				columns={columns}
				data={!error && data?.data ? data.data : fakeData}
				isLoading={isLoading}
				hideToolbar
			/>
		</div>
	);
}
