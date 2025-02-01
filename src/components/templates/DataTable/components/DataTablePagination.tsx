import { Table } from '@tanstack/react-table';

import { useTranslation } from '@/i18n';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/registry/new-york/ui/select';

import Pages from './Pages';
import { useEffect } from 'react';

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
	table,
}: DataTablePaginationProps<TData>) {
	const { t } = useTranslation();

	const { pageSize , pageIndex } = table.getState().pagination;
	const total = table.getFilteredRowModel().rows.length;
	const selected = table.getFilteredSelectedRowModel().rows.length;
	const pageCount = table.getPageCount();

	useEffect(() => {
		table.setPageSize(Number(50));
	},[])

	return (
		<div className="flex items-center justify-between px-2">
			<div className="hidden lg:flex flex-1 text-sm text-muted-foreground">
				{t('table.pagination.selection', { selected, total })}
			</div>
			<div className="w-full lg:w-8/12 flex justify-between items-center space-x-0 lg:space-x-8">
				<div className="hidden lg:flex lg:w-full  items-center lg:space-x-2">
					<p className="text-sm font-medium">
						{t('table.pagination.per_page')}
					</p>
					<Select
						value={`${pageSize}`}
						onValueChange={value => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map(p => (
								<SelectItem key={p} value={`${p}`}>{p}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="w-full  lg:w-auto">
					<Pages
						pageIndex={pageIndex}
						pageCount={pageCount}
						setPageIndex={table.setPageIndex}
					/>
				</div>
			</div>
		</div>
	);
}
