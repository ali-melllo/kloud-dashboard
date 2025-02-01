'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { Pen, Trash } from '@phosphor-icons/react';
import { ColumnDef } from '@tanstack/react-table';

import { notificationProvider } from '@/providers/notificationProvider';

import { useAppDispatch } from '@/store/hooks';

import { envoirmentsApi, useListBuildConfigmapsQuery } from '@/services/modules/envoirments';
import { ConfigmapType } from '@/services/modules/envoirments/type';

import { Button } from '@/registry/new-york/ui/button';

import { DataTable, Spinner } from '@/components';

import ConfigmapForm from '../../envoirments/Form';

type PropTypes = {
	params: {
		company: string,
		project: string,
		namespace: string,
		application: string
	}
}

type EditValues = {
	key: string,
	value: string
}

export default function BuildEnvironmentsList({
	params: {
		company, project, namespace, application,
	},
}: PropTypes) {
	const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
	const [editValues, setEditValues] = useState<EditValues>({ key: '', value: '' });
	const [loading, setIsLoading] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const handleEditClick = useCallback((rowIndex: number, row: ConfigmapType) => {
		setEditingRowIndex(rowIndex);
		setEditValues({ key: row.key, value: row.value });
	}, []);

	const handleSaveClick = useCallback(async () => {
		let finalData = {};
		setEditValues((prev: EditValues) => {
			finalData = prev;
			return prev;
		});
		setIsLoading(true);
		try {
			await dispatch(envoirmentsApi.endpoints.updateBuildConfigmap.initiate({
				company, project, namespace, application, ...finalData,
			})).unwrap();
			setEditingRowIndex(null);
			notificationProvider.open({
				type: 'success', message: 'Updated Successfully',
			});
			setIsLoading(false);
		}
		catch (err) {
			setIsLoading(false);
			setEditingRowIndex(null);
		}
	}, []);

	const handleCancelClick = useCallback(() => {
		setEditingRowIndex(null);
	}, []);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setEditValues((prevState: EditValues) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleDeleteClick = useCallback(async (key: string) => {
		try {
			await dispatch(envoirmentsApi.endpoints.deleteBuildConfigmap.initiate({
				company, project, namespace, application, key,
			})).unwrap();
			notificationProvider.open({
				type: 'success', message: 'Deleted Successfully',
			});
		}
		catch (err) { /* Errors */ }
	}, []);

	const columns = useMemo<ColumnDef<ConfigmapType>[]>(() => [
		{
			accessorKey: 'key',
			header: 'Key',
			cell: ({ getValue }) => {
				return (
					getValue()
				);
			},
		},
		{
			accessorKey: 'value',
			header: 'Value',
			cell: ({ row, getValue }) => {
				const rowIndex = row.index;
				const shortenString = (str: any) => {
					if (str.length > 20) {
						return `${str.substring(0, 30)}...`;
					}
					return str;
				};
				return (
					editingRowIndex === rowIndex ? (
						<div className="w-32">
							<input
								type="text"
								name="value"
								className="h-8 px-3 outline-none bg-muted rounded"
								defaultValue={editValues.value}
								onChange={handleInputChange}
							/>
						</div>
					) : (
						<div className="w-32">
							{shortenString(getValue())}
						</div>
					)
				);
			},
		},
		{
			header: 'Actions',
			cell: ({ row }) => {
				const rowIndex = row.index;
				return (
					<div className="flex w-36 flex-row items-center gap-x-3">
						{editingRowIndex === rowIndex ? (
							<>
								<Button className="rounded-2xl h-6" onClick={handleSaveClick}>{loading ? <Spinner /> : 'Save'}</Button>
								<Button variant="outline" className="rounded-2xl h-6" onClick={handleCancelClick}>Cancel</Button>
							</>
						) : (
							<Button className="rounded-2xl  h-6 my-1" onClick={() => handleEditClick(rowIndex, row.original)}>
								<Pen className="me-2" />
								Edit
							</Button>
						)}
						<Button onClick={() => handleDeleteClick(row.original.key)} variant="outline" className="rounded-2xl h-6 my-1">
							<Trash className="me-2" />
							Delete
						</Button>
					</div>
				);
			},
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
	], [editingRowIndex]);

	const { data, error, isLoading } = useListBuildConfigmapsQuery(
		{
			company, project, namespace, application,
		},
		{ skip: !namespace },
	);

	return (
		<div className="w-full flex flex-col">
			<h2 className="text-xl text-gray-400 tracking-tight ">
				Build Time Environments
			</h2>
			<div className="w-full pb-10">
				<ConfigmapForm params={{
					company, project, namespace, application, buildTime: true,
				}}
				/>
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
