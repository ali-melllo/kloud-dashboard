'use client';

import { useCallback } from 'react';
import { DotsThree } from '@phosphor-icons/react';
import { Row } from '@tanstack/react-table';

import { useAppDispatch } from '@/store/hooks';

import { Button } from '@/registry/new-york/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/registry/new-york/ui/dropdown-menu';

type ItemPropType<TData> = {
	label: string;
	onClick?: (_?: Row<TData>) => void;
	onSuccess?: (data: any) => any
	api: any;
	requestParams: {};
}

type PropTypes<TData> = {
	row: Row<TData>;
	items: ItemPropType<TData>[];
}

export function DataTableRowActions<TData>({ row, items }: PropTypes<TData>) {
	const dispatch = useAppDispatch();
	const handleActionClick = useCallback(async (item: ItemPropType<TData>) => {
		if (item.api) {
			try {
				const response = await dispatch(item.api?.initiate({ ...item.requestParams })).unwrap();
				if (item.onSuccess) item.onSuccess(response.data);
			}
			catch (err) {
				console.log(err);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex h-5 w-5 p-0 data-[state=open]:bg-muted">
					<DotsThree className="h-4 w-4" />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				{items.map((item, i) => (
					// eslint-disable-next-line react/no-array-index-key
					<DropdownMenuItem
						key={i}
						onClick={e => {
							e.stopPropagation();
							handleActionClick(item);
							if (item.onClick) {
								item.onClick();
							}
						}}
						className="cursor-pointer"
					>
						{item.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
