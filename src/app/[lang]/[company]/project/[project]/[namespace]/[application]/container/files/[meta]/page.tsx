'use client';

import React, {
	useCallback, useEffect, useMemo, useState,
} from 'react';
import { File, Folder, LinkSimpleHorizontal } from '@phosphor-icons/react';
import { ColumnDef, Row } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUploadFileMeta } from '@/store/slices/app';

import { applicationsApi } from '@/services/modules/applications';
import { ApplicationFileItemType } from '@/services/modules/services/type';

import { DateUtils } from '@/lib/Utils';

import {
	Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator,
} from '@/registry/new-york/ui/breadcrumb';
import {
	Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@/registry/new-york/ui/tooltip';

import { DataTable } from '@/components';
import { DataTableRowActions } from '@/components/templates/DataTable/components/DataTableRowActions';

import 'xterm/css/xterm.css';

type PropTypes = {
	params: {
		company: string;
		project: string;
		namespace: string;
		application: string;
		meta: string;
	};
};

export default function FilesManager({ params }: PropTypes) {
	const {
		company, project, namespace, application, meta,
	} = params;

	const searchParams = useSearchParams();
	const container = searchParams.getAll('container')[0];
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [data, setData] = useState<any>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [fileNamePath, setFileNamePath] = useState<string[]>(['']);
	const [breadCrumbItems, setBreadCrumbItems] = useState<string[]>(['/']);

	const { uploadFileMeta } = useAppSelector(state => state.app);

	const getPathUpToIndex = (index: number) => {
		const slicedArray = breadCrumbItems.slice(0, index + 1);
		setBreadCrumbItems(slicedArray);
		setFileNamePath(fileNamePath.slice(0, index + 1));
	};

	const getApplicationFiles = useCallback(async (fileName: string) => {
		setIsLoading(true);
		try {
			const result : any = await dispatch(applicationsApi.endpoints.getApplicationFiles.initiate({
				company,
				project,
				namespace,
				application,
				meta,
				container,
				body: { source: fileName || '/', action: 'list' },
			}, { forceRefetch: true })).unwrap(); 
			const newData = result.data.filter((item: any) => item.name !== '.' && item.name !== '..');
			setData({ data: newData });
			setIsLoading(false);
		}
		catch (err) {
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, fileNamePath]);

	useEffect(() => {
		getApplicationFiles(fileNamePath.join(''));
		dispatch(setUploadFileMeta({
			uploadFileMeta: {
				meta,
				container,
				fileNamePath: fileNamePath.join('') || '/',
				refetch: false,
			},
		}));
	}, [fileNamePath]);

	useEffect(() => {
		if (uploadFileMeta.refetch) {
			const newData = uploadFileMeta.data.filter((item: any) => item.name !== '.' && item.name !== '..');
			setData({ data: newData });
			dispatch(setUploadFileMeta({
				uploadFileMeta: {
					...uploadFileMeta,
					refetch: false,
				},
			}));
		}
	}, [uploadFileMeta]);

	const columns = useMemo<ColumnDef<ApplicationFileItemType>[]>(() => [
		{
			header: 'Name',
			cell: ({ row }) => {
				const { name, type } = row.original;
				const shortenString = (str: string) => {
					if (str.length > 20) {
						return `${str.substring(0, 20)}...`;
					}
					return str;
				};
				return (
					<div className="flex flex-row gap-x-2 items-center">
						{type === 'file' && <File />}
						{type === 'folder' && <Folder />}
						{type === 'link' && <LinkSimpleHorizontal />}
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<p>{shortenString(name)}</p>
								</TooltipTrigger>
								<TooltipContent>
									<p>{name}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				);
			},
		},
		{
			header: 'Owner',
			cell: ({ row }) => {
				const { owner } = row.original;

				return <p className="text-sm font-thin text-gray-500">{owner}</p>;
			},
		},
		{
			header: 'Group',
			cell: ({ row }) => {
				const { group } = row.original;

				return <p className="text-sm font-thin text-gray-500">{group}</p>;
			},
		},
		{
			header: 'Modified',
			cell: ({ row }) => {
				const { modified } = row.original;

				return <p className="text-sm font-thin text-gray-500">{DateUtils.convertDate(modified)}</p>;
			},
		},
		{
			header: 'Size',
			cell: ({ row }) => {
				const { size, type } = row.original;

				return type === 'file' && <p className="text-sm font-thin text-gray-500">{size}</p>;
			},
		},
		{
			header: 'Mode',
			cell: ({ row }) => {
				const { mode } = row.original;
				return <p className="text-sm font-thin text-gray-500">{mode}</p>;
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
							api: '',
							onClick: () => {
								dispatch(setUploadFileMeta({
									uploadFileMeta: {
										meta,
										container,
										fileNamePath: `${fileNamePath.join('')}`,
										fileName: `${fileNamePath.join('')}/${row.original.name}`,
										refetch: false,
									},
								}));
								router.push('delete');
							},
							requestParams: {},
						},
					]}
				/>
			),
		},
	], [fileNamePath]);

	const onRowClick = useCallback(
		async (row: Row<ApplicationFileItemType>) => {
			const { name: rowName, type } = row.original;
			if (type !== 'file') {
				setFileNamePath(prev => [...prev, `/${rowName}`]);
				setBreadCrumbItems(prev => [...prev, (rowName)]);
			}
		},
		[],
	);

	return (
		<div className="h-full w-full overflow-hidden">
			<div className="flex flex-row justify-between mb-5 items-center">
				<Breadcrumb>
					<BreadcrumbList>
						{breadCrumbItems.map((item, index: number, arr) => (
							<>
								<BreadcrumbItem
									className="cursor-pointer"
									onClick={() => {
										if (index !== arr.length - 1) {
											getPathUpToIndex(index);
										}
									}}
								>
									{item}
								</BreadcrumbItem>
								<BreadcrumbSeparator />
							</>
						))}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<DataTable
				onRowClick={onRowClick}
				columns={columns}
				data={data?.data ? data.data : []}
				isLoading={isLoading}
				hideToolbar
			/>
		</div>
	);
}
