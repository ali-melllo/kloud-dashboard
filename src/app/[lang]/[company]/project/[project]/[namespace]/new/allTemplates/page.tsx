'use client';

import React from 'react';

import { useGetMetaServiceQuery } from '@/services/modules/services';

import { Card, CardContent } from '@/registry/new-york/ui/card';

import Link from '@/components/ui/link';

type PropTypes = {
	params: {
		company: string;
		project: string;
		namespace: string;
	}
}

export default function AllTemplates({
	params: { company, project, namespace },
}: PropTypes) {
	const { data } = useGetMetaServiceQuery({ company, project, namespace });

	return (
		<div className="pt-10 flex flex-wrap items-center gap-5 max-w-full">
			{data?.data.map(temp => (
				<Link className="w-40 h-28 flex justify-center items-center font-medium transition-colors hover:text-primary hover:border-primary text-muted-foreground cursor-pointer" href={temp.id}>
					<Card className="w-full pt-5 flex justify-center items-center h-full">
						<CardContent className="w-full flex justify-center items-center h-full">
							{temp.label}
						</CardContent>
					</Card>
				</Link>
			))}
		</div>
	);
}
