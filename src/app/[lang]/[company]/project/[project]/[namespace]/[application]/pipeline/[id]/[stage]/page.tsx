/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { ArrowClockwise, Terminal } from '@phosphor-icons/react';
import { dir } from 'i18next';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/store/hooks';

import { pipelinesApi, useGetPipelineQuery } from '@/services/modules/pipelines';

import { appConst } from '@/configs';
import { DateUtils } from '@/lib/Utils';
import { cn } from '@/lib/Utils/CssUtils';

import { useTranslation } from '@/i18n';

import { Badge } from '@/registry/new-york/ui/badge';
import { Button } from '@/registry/new-york/ui/button';

import { DataRow, Spinner } from '@/components';
import WsTerminal from '@/components/templates/WsTerminal';
import Link from '@/components/ui/link';

import 'xterm/css/xterm.css';

type PropTypes = {
	params: {
		company: string,
		project: string,
		namespace: string,
		id: string,
		stage: string,
		application: string,
		lang: string,
	}
}

export default function PipelineView({
	params,
}: PropTypes) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const router = useRouter();

	const [isRetrying, setIsRetrying] = useState<boolean>(false);
	const [isKilling, setIsKilling] = useState<boolean>(false);

	const { data, isLoading: dataLoading, refetch } = useGetPipelineQuery({
		company: params.company,
		project: params.project,
		namespace: params.namespace,
		pipeline: params.id,
		application: params.application,
	});

	const jobData = useMemo(() => {
		return data?.data.jobs?.find(j => j.stage === params.stage);
	}, [data, params.stage]);

	const retryPipeline = useCallback(async () => {
		setIsRetrying(true);
		try {
			const result = await dispatch(pipelinesApi.endpoints.retryPipeline.initiate({
				company: params.company,
				project: params.project,
				namespace: params.namespace,
				pipeline: params.id,
				application: params.application,
			})).unwrap();

			setTimeout(() => {
				setIsRetrying(false);
				router.push(`/${params.lang}/${params.company}/project/${params.project}/${params.namespace}/${params.application}/pipeline/${result.data.id}/${params.stage}`);
			}, 3000);
		}
		catch (err) {
			setIsRetrying(false);
			console.error('Failed to retry pipeline:', err);
		}
	}, [dispatch, params, refetch]);

	const killPipeline = useCallback(async () => {
		setIsKilling(true);
		try {
			await dispatch(pipelinesApi.endpoints.killPipeline.initiate({
				company: params.company,
				project: params.project,
				namespace: params.namespace,
				pipeline: params.id,
				application: params.application,
			})).unwrap();

			setTimeout(() => {
				setIsKilling(false);
				router.push(`/${params.lang}/${params.company}/project/${params.project}/${params.namespace}/${params.application}/pipeline/list`);
			}, 3000);
		}
		catch (err) {
			setIsKilling(false);
			console.error('Failed to kill pipeline:', err);
		}
	}, [dispatch, params]);

	return (
		<div className="h-full grid grid-cols-1 lg:grid-cols-5">
			<div className={`col-span-6 lg:col-span-4 ${dir(params.lang) === 'ltr' ? 'lg:border-r' : 'lg:border-l'}  h-full pe-6`}>
				<WsTerminal
					baseUrl="wss://kloud.team/api/core/ws-pipelines-logs"
					params={{
						company: params.company,
						project: params.project,
						namespace: params.namespace,
						application: params.application,
						pipeline: params.id,
						stage: params.stage,
					}}
				/>
			</div>

			<div className="px-6 mb-20 lg:mb-0 lg:-me-14">
				{dataLoading ? <div className="flex justify-center items-center h-full"><Spinner /></div> : data ? (
					<>
						<div className="pb-4 mb-4 border-b">
							<div className="flex justify-between items-center mb-3">
								<h2 className="font-semibold text-xl">{t('pages.pipelines.labels.pipeline_detail')}</h2>
								{jobData
								&& (
									<Badge className={`hover:bg-${appConst.pipelinesColorMap[jobData?.status]}`} variant={appConst.pipelinesColorMap[jobData?.status]}>
										{jobData?.status}
									</Badge>
								)}
							</div>

							{!jobData ? <div className="p-1 my-3"><Spinner /></div> : (
								<div className="flex flex-row justify-start gap-x-3 items-center my-3">
									{!isRetrying ? (
										<Button onClick={retryPipeline} variant="outline" className="h-6 text-sm">
											<ArrowClockwise className="me-2" />
											Retry
										</Button>
									)
										: <Spinner />}

									{!isKilling ? (
										<Button onClick={killPipeline} variant="outline" className="h-6 border-destructive hover:bg-destructive hover:text-white text-sm">
											<Terminal className="me-2" />
											Kill
										</Button>
									) : <Spinner />}
								</div>
							)}

							<div>
								<DataRow label={t('labels.commit')} value={data.data.commit} />
								<DataRow label={t('labels.created_at')} value={DateUtils.convertDate(data.data.created)} />
								<DataRow label={t('labels.created_by')} value={data.data.created_by} />
								<DataRow label={t('labels.branch')} value={data.data.branch} />
								<DataRow label={t('labels.id')} value={data.data.id} />
							</div>
						</div>

						<div className="mb-3 pb-3">
							<div className="mb-3">
								<h2 className="font-semibold text-xl">{t('pages.pipelines.labels.pipeline_jobs')}</h2>
							</div>
							<div>
								{data?.data.jobs?.map(job => (
									<Link
										href={`${job.stage}`}
										key={job.stage}
										className={cn('block border-2 rounded-md bg-accent py-2 px-4 text-accent-foreground cursor-pointer mb-3 last:mb-0', job.stage === params.stage ? 'border-zinc-400' : '')}
									>
										<DataRow label={t('pages.pipelines.labels.stage')} value={job.stage} />
										<DataRow label={t('labels.duration')} value={`${DateUtils.diff(job.end, job.start)} seconds`} />
										<DataRow label={t('labels.status')} value={job.status} />
									</Link>
								))}
							</div>
						</div>
					</>
				) : null}
			</div>
		</div>
	);
}
