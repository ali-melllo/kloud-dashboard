'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import { ColumnDef, Row } from '@tanstack/react-table';
import { useRouter } from 'next-nprogress-bar';

import { useListPipelineQuery } from '@/services/modules/pipelines';
import { PipelineType } from '@/services/modules/pipelines/type';

import { appConst } from '@/configs';
import { DateUtils } from '@/lib/Utils';

import {
	Tooltip, TooltipContent, TooltipTrigger,
} from '@/registry/new-york/ui/tooltip';

import { DataTable } from '@/components';
import Link from '@/components/ui/link';

type PropTypes = {
	params: {
		company: string, project: string, namespace: string, application: string
	}
}

export default function PipelineList({
	params:
	{
		company, project, namespace, application,
	},
}: PropTypes) {
	const router = useRouter();

	const onRowClick = useCallback((row: Row<PipelineType>) => {
		const { id, jobs } = row.original;
		const [job] = jobs;
		router.push(`${id}/${job.stage}`);
	}, [router]);

	const columns = useMemo<ColumnDef<PipelineType>[]>(() => [
		{
			header: 'commit',
			cell: ({ row }) => {
				return (
					<span className="w-[80px] flex flex-row">
						{row.original.commit.slice(0, 8)}
					</span>
				);
			},
		},
		{
			header: 'Stages',
			cell: ({ row }) => {
				const { id, jobs } = row.original;

				return (
					<div className="flex flex-row">
						{jobs ? jobs.map(job => {
							const Icon = appConst.pipelinesIconMap[job.status];
							const color = appConst.pipelinesColorMap[job.status];

							return (

								<Tooltip key={`${id}-${job.stage}`} delayDuration={0}>
									<TooltipTrigger className="flex items-center">
										<Link href={`${namespace}/pipelines/${id}/${job.stage}`} className={`text-${color} inline-block`}>
											{Icon && <Icon className="stroke-current me-2 size-6" />}
										</Link>
									</TooltipTrigger>
									<TooltipContent side="top">
										{`${job.stage}:${job.status}`}
									</TooltipContent>
								</Tooltip>
							);
						}) : null}
					</div>
				);
			},
		},
		{
			header: 'ID',
			cell: ({ row }) => {
				return (
					<span className="text-gray-500">
						{row.original.id.slice(-8)}
					</span>
				);
			},
		},
		{
			accessorKey: 'created_by',
			header: 'Message',
		},

		{
			header: 'Created At',
			cell: ({ row }) => {
				return (
					<span>
						{DateUtils.convertDate(row.original.created)}
					</span>
				);
			},
		},

	], [namespace]);

	const {
		data, error, isLoading, refetch,
	} = useListPipelineQuery(
		{
			company, project, namespace, application,
		},
		{ skip: !namespace },
	);

	useEffect(() => {
		if (namespace) {
			refetch();
		}
	}, [namespace, refetch]);

	return (
		<div className="h-full max-w-full">
			<DataTable
				error={error}
				columns={columns}
				data={!error && data?.data ? data.data : []}
				isLoading={isLoading}
				hideToolbar
				onRowClick={onRowClick}
			/>
		</div>
	);
}
