'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next-nprogress-bar';

import { useListApplicationQuery } from '@/services/modules/applications';

import { Card, CardContent, CardFooter } from '@/registry/new-york/ui/card';
import { Input } from '@/registry/new-york/ui/input';
import { Separator } from '@/registry/new-york/ui/separator';

import { CopyButton } from '@/components';

import OverviewLoadingLayout from '../../components/overview/OverviewLoadingLayout';

type PropTypes = {
	params: {
		company: string, project: string, namespace: string
	}
}

export default function ProjectOverview({
	params: { company, project, namespace },
}: PropTypes) {
	const router = useRouter();

	const handleSelect = useCallback((row: { name: string }) => {
		router.push(`/${company}/project/${project}/${namespace}/${row.name}/overview/list`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	const { data, isLoading } = useListApplicationQuery({ company, project, namespace });

	const fakeData = [{
		spec_port: 0,
		spec_replicas: 0,
		git_url: '/Github.com/Cloud',
		git_dockerfile: 'string',
		git_user: 'ali',
		git_secret: 'string',
		id: 'string',
		create_date: '2024/14/3',
		name: 'Monstrat',
		type: 'Template',
		meta_id: 'string',
		running: true,
		spec: {
			git: {
				branch: 'Main',
				url: '/Github.com/Cloud',
			},
			deployment: {
				limitRam: '2',
				limitCPU: '4',
				replicas: '1',
			},
		},
		template_id: 'string',
	},
	{
		spec_port: 0,
		spec_replicas: 0,
		git_url: '/Github.com/Cloud',
		git_dockerfile: 'string',
		git_user: 'ali',
		git_secret: 'string',
		id: 'string',
		create_date: '2024/14/3',
		name: 'Development',
		type: 'Ci/Cd',
		meta_id: 'string',
		running: true,
		spec: {
			git: {
				branch: 'Master',
				url: '/Github.com/Cloud',
			},
			deployment: {
				limitRam: '2',
				limitCPU: '4',
				replicas: '1',
			},
		},
		template_id: 'string',
	}];

	return (
		<div className="w-full flex flex-col items-center gap-3">
			{isLoading && (
				<div className="w-full flex flex-col">
					<OverviewLoadingLayout />
				</div>
			)}
			<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
				{ fakeData.map(app => (
					<Card
						key={app.name}
						className="flex hover:border-primary/40 w-full flex-auto transition-all duration-200 cursor-pointer"
						onClick={() => { handleSelect(app); }}
					>
						<CardContent className="w-full p-5 pb-3">
							<div className="w-full flex flex-col gap-2 items-start">
								<div className="flex w-full justify-between mb-2">
									<div className="flex">
										<div
											className="size-16 bg-background-muted border-input rounded-lg flex items-center justify-center text-3xl me-2 uppercase"
											style={{ borderWidth: 1 }}
										>
											{app.name.charAt(0)}
										</div>
										<div>
											<h1 className="text-2xl mb-1 font-bold tracking-tight">
												{app.name}
											</h1>
											<p className="text-gray-500">{app.type}</p>
										</div>
									</div>
									<div className="flex gap-x-2">
										<span className={`${app.running ? 'text-green-500' : 'text-red-600'} `}>&#x25CF;</span>
										<p>{app.running ? 'Active' : 'Not Active'}</p>
									</div>
								</div>

								<div className="flex w-full items-center">
									<Input placeholder="Git url" defaultValue={app.spec?.git.url} disabled className="w-10/12 me-2" />
									<CopyButton value="https://github.com/kloud-team" />
								</div>

								{data ? (
									<div className="flex justify-between w-full">
										{app.type === 'ci/cd'
											&& (
												<div dir="ltr" className="flex flex-row gap-x-3 items-center justify-between">
													<p>Branch :</p>
													<p className="text-sm text-gray-500">{app.spec?.git.branch}</p>
												</div>
											)}
										<div dir="ltr" className="flex flex-row gap-x-3 items-center justify-between">
											<p>Creation :</p>
											<p className="text-sm text-gray-500">{new Date(app.create_date).toLocaleDateString()}</p>
										</div>
									</div>
								) : null}
								<CardFooter className="flex flex-row justify-between w-full border-t p-4 px-0 pb-0">
									<div className="flex w-full items-center gap-2">
										<div className="grid flex-1 auto-rows-min gap-0.5">
											<div className="text-xs text-muted-foreground">CPU</div>
											<div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
												{app.spec?.deployment.limitRam}
												<span className="text-sm font-normal text-muted-foreground">
													Gb
												</span>
											</div>
										</div>
										<Separator orientation="vertical" className="mx-2 h-10 w-px" />
										<div className="grid flex-1 auto-rows-min gap-0.5">
											<div className="text-xs text-muted-foreground">RAM</div>
											<div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
												{app.spec?.deployment.limitCPU}
												<span className="text-sm font-normal text-muted-foreground">
													Core
												</span>
											</div>
										</div>
										<Separator orientation="vertical" className="mx-2 h-10 w-px" />
										<div className="grid flex-1 auto-rows-min gap-0.5">
											<div className="text-xs text-muted-foreground">Replicas</div>
											<div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
												{app.spec?.deployment.replicas}
												<span className="text-sm font-normal text-muted-foreground">
													Svc
												</span>
											</div>
										</div>
									</div>
								</CardFooter>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
