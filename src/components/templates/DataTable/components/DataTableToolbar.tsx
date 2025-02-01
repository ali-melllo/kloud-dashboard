'use client';

import { X } from '@phosphor-icons/react';
import { Table } from '@tanstack/react-table';

import { useTranslation } from '@/i18n';

import { Button } from '@/registry/new-york/ui/button';
import { Input } from '@/registry/new-york/ui/input';

import { DataTableViewOptions } from './DataTableViewOptions';

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;
	const { t } = useTranslation();

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder={t('table.filter.placeholder')}
					value={(table.getColumn('project')?.getFilterValue() as string) ?? ''}
					onChange={event => table.getColumn('project')?.setFilterValue(event.target.value)}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{/* {table.getColumn('status') && (
					<DataTableFacetedFilter
						column={table.getColumn('status')}
						title="Status"
						options={statuses}
					/>
				)}
				{table.getColumn('priority') && (
					<DataTableFacetedFilter
						column={table.getColumn('priority')}
						title="Priority"
						options={priorities}
					/>
				)} */}
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						{t('table.filter.reset')}
						<X className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}
