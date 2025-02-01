'use client';

import React from 'react';

import { useTranslation } from '@/i18n';

import {
	TableCell,
	TableRow,
} from '@/registry/new-york/ui/table';

type PropTypes = {
	colSpan: number
};

export default function DataTableEmpty({ colSpan }: PropTypes) {
	const { t } = useTranslation();

	return (
		<TableRow>
			<TableCell colSpan={colSpan} className="h-24 text-center">
				{t('table.no_results')}
			</TableCell>
		</TableRow>
	);
}
