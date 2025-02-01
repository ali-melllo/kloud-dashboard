import React, { memo, useCallback } from 'react';

import { cn } from '@/lib/Utils/CssUtils';

import { useTranslation } from '@/i18n';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/registry/new-york/ui/pagination';

type PropTypes = {
	pageCount: number;
	pageIndex: number;
	setPageIndex: (_: number) => void;
}

function Pages({ pageCount, pageIndex, setPageIndex }: PropTypes) {
	const { t } = useTranslation();

	const renderPages = useCallback(() => {
		const pages = [];

		if (pageCount < 4) {
			for (let i = 0; i < pageCount; i += 1) {
				pages.push(i);
			}
		}
		else if (pageIndex < 3) {
			for (let i = 0; i < pageIndex + 2; i += 1) {
				pages.push(i);
			}
			pages.push('...');
			pages.push(pageCount - 1);
		}
		else if (pageIndex > pageCount - 3) {
			pages.push(0);
			pages.push('...');
			for (let i = pageCount - 4; i < pageCount; i += 1) {
				pages.push(i);
			}
		}
		else {
			pages.push(0);
			pages.push('...');
			for (let i = pageIndex - 1; i <= pageIndex + 1; i += 1) {
				pages.push(i);
			}
			pages.push('...');
			pages.push(pageCount - 1);
		}

		return pages.map((page, index) => (
			// eslint-disable-next-line react/no-array-index-key
			<PaginationItem key={index}>
				{page === '...'
					? <PaginationEllipsis />
					: (
						<PaginationLink
							onClick={() => setPageIndex(page as number)}
							isActive={page === pageIndex}
						>
							{page as number + 1}
						</PaginationLink>
					)}
			</PaginationItem>
		));
	}, [pageCount, pageIndex, setPageIndex]);

	return (
		<Pagination className="w-full">
			<PaginationContent className="w-full  flex justify-between">
				<PaginationItem>
					<PaginationPrevious
						className={cn(pageIndex === 0 ? 'opacity-20' : 'opacity-100')}
						label={t('table.pagination.previous')}
						onClick={pageIndex === 0 ? undefined : () => setPageIndex(pageIndex - 1)}
					/>
				</PaginationItem>

				{renderPages()}

				<PaginationItem>
					<PaginationNext
						className={cn(pageIndex === pageCount - 1 ? 'opacity-20' : 'opacity-100')}
						label={t('table.pagination.next')}
						onClick={pageIndex === pageCount - 1 ? undefined : () => setPageIndex(pageIndex + 1)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}

export default memo(Pages, (prev, next) => prev.pageIndex === next.pageIndex
	&& prev.pageCount === next.pageCount);
