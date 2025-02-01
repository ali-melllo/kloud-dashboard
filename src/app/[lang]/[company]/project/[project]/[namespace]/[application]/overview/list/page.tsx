'use client';

import React, { useEffect, useMemo } from 'react';
import { Info } from '@phosphor-icons/react';

import { useAppDispatch } from '@/store/hooks';
import { setApplicationData } from '@/store/slices/app';

import { useGetApplicationQuery } from '@/services/modules/applications';

import { useTranslation } from '@/i18n';

import { Button } from '@/registry/new-york/ui/button';
import {
	Card, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/registry/new-york/ui/card';

import Link from '@/components/ui/link';

import OverViewCards from './OverViewCards';

type PropTypes = {
	params: {
		lang: string, company: string, project: string, namespace: string, application: string
	}
}

export default function OverViewLayout({
	params: {
		company, project, namespace, application, lang,
	},
}: PropTypes) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const { data, refetch } = useGetApplicationQuery({
		company, project, namespace, application,
	}, { skip: !namespace });

	useEffect(() => {
		if (namespace) {
			refetch();
		}
	}, [namespace, refetch]);

	useMemo(() => {
		dispatch(setApplicationData({ application: data?.data }));
	}, [data, dispatch]);

	return (
		<>
			{(data?.data && data?.data.running) && (
				<div className="flex items-start justify-around gap-x-5">
					<OverViewCards data={data} />
				</div>
			)}
			{(data?.data && !data?.data.running) && (
				<Card
					className="sm:col-span-2 h-64 lg:h-80 flex justify-center items-center"
				>
					<div className="w-full lg:w-8/12 flex justify-center items-center">

						<div className="w-full lg:w-6/12 h-full flex flex-col justify-center">
							<CardHeader className="pb-3">
								<CardTitle className="text-lg flex items-center">
									<Info className="mr-3" width={50} height={50} />
									{t('pages.applications.system_is_turned_off')}
								</CardTitle>
								<CardDescription className="max-w-72 text-balance leading-relaxed flex ">
									{t('pages.applications.system_is_turned_off_description')}
								</CardDescription>
							</CardHeader>
							<CardFooter>
								<Link href={`/${lang}/${company}/project/${project}/${namespace}/${application}/settings/installation`}>
									<Button variant="outline">{t('pages.applications.install')}</Button>
								</Link>
							</CardFooter>
						</div>
					</div>
				</Card>
			)}
		</>
	);
}
