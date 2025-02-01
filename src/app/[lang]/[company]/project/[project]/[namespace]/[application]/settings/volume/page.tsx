'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import { Plus } from '@phosphor-icons/react';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { useListPvcQuery, volumeApi } from '@/services/modules/volume';
import { PvcType } from '@/services/modules/volume/type';

import { DateUtils } from '@/lib/Utils';
import { showToast } from '@/lib/Utils/ToastUtils';

import { useTranslation } from '@/i18n';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/registry/new-york/ui/alert-dialog';
import { Button } from '@/registry/new-york/ui/button';

import { DataTable } from '@/components';

type PropTypes = {
	params: {
		lang: string;
		company: string,
		project: string,
		namespace: string,
		application: string
	}
}

export default function VolumePage({
	params: {
		lang, company, project, namespace, application,
	},
}: PropTypes) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const { application: appData }: any = useAppSelector(state => state.app);

	const handleDeleteClick = useCallback(async (id: string) => {
		try {
			await dispatch(volumeApi.endpoints.deletePvc.initiate({
				company, project, namespace, application, id,
			})).unwrap();
			showToast({
				title: 'Deleted Successfully',
				variant: 'default',
			});
		}
		catch (err) { /* Errors */ }
	}, []);

	const columns = useMemo<ColumnDef<PvcType>[]>(() => [
		{
			accessorKey: 'name',
			header: t('pages.volume.table.name'),
			cell: ({ getValue }: any) => {
				return (
					<div>
						{getValue()}
					</div>
				);
			},
		},
		{
			accessorKey: 'mount_path',
			header: t('pages.volume.table.mount_path'),
			cell: ({ getValue }: any) => {
				return (
					<div>
						{getValue()}
					</div>
				);
			},
		},
		{
			accessorKey: 'status',
			header: t('pages.volume.table.status'),
			cell: ({ getValue }: any) => {
				return (
					<div>
						{getValue()}
					</div>
				);
			},
		},
		{
			accessorKey: 'plan',
			header: t('pages.volume.table.plan'),
			cell: ({ getValue }: any) => {
				return (
					<div className="text-gray-500">
						{getValue()}
					</div>
				);
			},
		},
		{
			header: t('pages.volume.table.resource'),
			cell: ({ row }: any) => {
				return (
					<div className="text-center text-gray-500">
						{row.original.resource + '/' + row.original.capacity}
					</div>
				);
			},
		},
		{
			accessorKey: 'class',
			header: t('pages.volume.table.class'),
			cell: ({ getValue }: any) => {
				return (
					<div className="text-gray-500">
						{getValue()}
					</div>
				);
			},
		},
		{
			accessorKey: 'create',
			header: t('pages.volume.table.create'),
			cell: ({ getValue }: any) => {
				return (
					<div className="text-gray-500 text-xs">
						{DateUtils.convertDate(getValue())}
					</div>
				);
			},
		},
		{
			header: 'Actions',
			cell: ({ row }) => {
				return (
					<div className="flex max-w-36 flex-row items-center gap-x-3">
						<AlertDialog>
							<AlertDialogTrigger className="bg-background border border-primary text-primary px-3 rounded-xl">Delete</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete your volume
										and remove your data from our servers.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction onClick={() => handleDeleteClick(row.original.name)} className="bg-background border border-destructive text-red-700">Delete</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				);
			},
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
	], []);

	const { data, error, isLoading, refetch } = useListPvcQuery(
		{
			company, project, namespace, application: appData.id,
		},
		{ skip: !namespace },
	);

	useEffect(() => {
		if (namespace) {
			refetch();
		}
	}, [namespace, refetch]);

	return (
		<div className="w-full flex flex-col">
			<div className="flex flex-row justify-between items-center">
				<h2 className="text-xl text-gray-400 tracking-tight ">
					Volume
				</h2>
				<Link className="text-lg" href={`/${lang}/${company}/project/${project}/${namespace}/${application}/settings/volume/new`}>
					<Button className="w-full">
						<Plus className="me-2" />
						{t('pages.volume.create')}
					</Button>
				</Link>
			</div>

			<div className="w-full pb-10 mt-5">
				<div className="h-full max-w-full">
					<DataTable
						error={error}
						columns={columns}
						data={!error && data?.data ? data.data : []}
						isLoading={isLoading}
						hideToolbar
					/>
				</div>
			</div>
		</div>
	);
}
