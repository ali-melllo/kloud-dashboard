'use client';

import React from 'react';
import { useRouter } from 'next-nprogress-bar';

import { useListProjectQuery } from '@/services/modules/projects';
import { ProjectType } from '@/services/modules/projects/type';

import OverviewLoadingLayout from '../[project]/[namespace]/components/overview/OverviewLoadingLayout';
import ProjectListItem from '../ListItem';

type PropTypes = {
	params: {
		company: string;
	}
}

export default function ProjectList({
	params: { company },
}: PropTypes) {
	const router = useRouter();

	const handleSelect = (row: ProjectType) => {
		const { namespaces, project } = row;
		if (namespaces) {
			router.push(`${project}/${namespaces[0].name}/overview/list`);
		}
	};

	const { data, isLoading } = useListProjectQuery({ company });

	return (
		<div className="w-full flex flex-col justify-between space-y-2">
			<div className="h-full max-w-full">
				{isLoading ? (
					<OverviewLoadingLayout />
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3">
						{data?.data.map((d: ProjectType) => (
							<ProjectListItem
								key={JSON.stringify(d)}
								keyProp={Math.random()}
								data={d}
								onSelect={handleSelect}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
