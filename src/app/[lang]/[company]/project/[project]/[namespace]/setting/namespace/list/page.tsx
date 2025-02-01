'use client';

import React, { useCallback, useMemo } from 'react';
import { Plus } from '@phosphor-icons/react';
import { ColumnDef } from '@tanstack/react-table';

import { namespacesApi, useListNamespaceQuery } from '@/services/modules/namespaces';
import { NameSpaceType } from '@/services/modules/namespaces/type';

import { DateUtils } from '@/lib/Utils';

import { useTranslation } from '@/i18n';

import { DataTable } from '@/components';
import { DataTableRowActions } from '@/components/templates/DataTable/components/DataTableRowActions';
import Link from '@/components/ui/link';
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
import { useAppDispatch } from '@/store/hooks';
import { showToast } from '@/lib/Utils/ToastUtils';

type PropTypes = {
	params: {
		company: string, project: string, namespace: string
	}
}

export default function NamespaceList({ params: { company, project, namespace } }: PropTypes) {
	const { t } = useTranslation();
    const dispatch = useAppDispatch();

	const handleDeleteClick = useCallback(async () => {
		try {
			await dispatch(namespacesApi.endpoints.deleteNamespace.initiate({
				company, project, namespace,
			})).unwrap();
			showToast({
				title: 'Deleted Successfully',
				variant: 'default',
			});
		}
		catch (err) { /* Errors */ }
	}, []);


	const columns = useMemo<ColumnDef<NameSpaceType>[]>(() => [
		{
			header: 'Name',
			cell: ({ row }) => {
				return (
					<span className="w-[80px] flex flex-row">
						{row.original.name}
					</span>
				);
			},
		},
		{
			header: 'Branch',
			cell: ({ row }) => {
				// const { labels } = row.original.kloud_crd.metadata;
				// const kind = labels['team.kloud.crd.kind'];
				return (
					<span className="w-[80px] flex flex-row">
						{row.original.branch}
					</span>
				);
			},
		},
		{
			header: 'Version',
			cell: () => {
				// const { labels } = row.original.kloud_crd.metadata;
				// const product = labels['team.kloud.crd.product'];
				return (
					<span className="font-normal text-md">product</span>
				);
			},
		},
		{
			header: 'Created',
			cell: ({ row }) => {
				const { create_data: createDate } = row.original;
				return (
					<span className="font-normal text-md">
						{DateUtils.convertDate(createDate)}
					</span>
				);
			},
		},
		{
			header: 'Actions',
			cell: ({ row }) => (
				// <DataTableRowActions
				// 	row={row}
				// 	items={[
				// 		{
				// 			label: 'Delete',
				// 			api: namespacesApi.endpoints.deleteNamespace,
				// 			requestParams: {
				// 				company, project, namespace,
				// 			},
				// 		},
				// 	]}
				// />
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
									<AlertDialogAction onClick={handleDeleteClick} className="bg-background border border-destructive text-red-700">Delete</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
			),
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
	], []);

	const { data, error, isLoading } = useListNamespaceQuery(
		{ company, project, namespace },
		{ skip: !namespace },
	);
	return (
		<div className="h-full w-full max-w-full ">
			<div className="w-full flex justify-end my-5">
				<Button asChild>
					<Link href="new" prefetch>
						<Plus className="me-2 h-4 w-4 stroke-current" />
						{' '}
						{t('namespace.create')}
					</Link>
				</Button>
			</div>

			<DataTable
				error={error}
				columns={columns}
				data={!error && data?.data ? data.data : []}
				isLoading={isLoading}
				hideToolbar
			/>
		</div>
	);
}
