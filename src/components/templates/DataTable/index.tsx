'use client';

import React, { useState } from 'react';
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getGroupedRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	Row,
	SortingState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';
import { dir } from 'i18next';
import { useParams } from 'next/navigation';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/registry/new-york/ui/table';

import DataTableEmpty from './components/DataTableEmpty';
import { DataTablePagination } from './components/DataTablePagination';
import { DataTableToolbar } from './components/DataTableToolbar';

type PropTypes<TData> = {
	columns: ColumnDef<TData>[];
	data: TData[];
	isLoading: boolean;
	onRowClick?: (_: Row<TData>) => void;
	hideToolbar?: boolean;
	error?: any;
	hidePagination?: boolean;
};

export default function DataTable<TData>({
	columns, data, isLoading, onRowClick, hideToolbar = false, hidePagination, error
}: PropTypes<TData>) {
	const [rowSelection, setRowSelection] = useState({});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const { lang }: string | any = useParams();

	const table = useReactTable({
		data,
		columns,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFilteredRowModel: getFilteredRowModel(),
		getGroupedRowModel: getGroupedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
		},
		enableRowSelection: true,
	});

	return (
		<div className="space-y-4 min-h-full">
			{!hideToolbar ? <DataTableToolbar table={table} /> : null}
			<div className="rounded-md border overflow-hidden">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead className={`${dir(lang) === 'ltr' ? '' : 'text-right'}`} key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>

						{isLoading ? (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									Loading...
								</TableCell>
							</TableRow>

						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									className={onRowClick ? 'cursor-pointer' : ''}
									data-state={row.getIsSelected() && 'selected'}
									onClick={onRowClick ? () => onRowClick(row) : undefined}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<DataTableEmpty colSpan={columns.length} />
						)}
					</TableBody>
				</Table>
			</div>
			{(!isLoading && !hidePagination) ? <DataTablePagination table={table} />
				: null}
		</div>
	);
}
