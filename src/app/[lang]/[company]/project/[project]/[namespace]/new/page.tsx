'use client';

import React from 'react';
import { Plus } from '@phosphor-icons/react';

import { useGetMetaServiceQuery } from '@/services/modules/services';

import { useTranslation } from '@/i18n';

import { Button } from '@/registry/new-york/ui/button';
import { Card, CardContent } from '@/registry/new-york/ui/card';

import Link from '@/components/ui/link';

type PropTypes = {
	params: {
		company: string;
		project: string;
		namespace: string;
		lang: string;
	}
}

export default function NewApplication({
	params: {
		company, project, namespace, lang,
	},
}: PropTypes) {
	const { t } = useTranslation();
	const { data } = useGetMetaServiceQuery({ company, project, namespace });
	const cicdProjectId = data?.data.find(x => x.type === 'ci/cd');

	return (
		<div className="h-full w-full flex  justify-center items-center -mt-20">
			<div className="flex h-2/6 items-center flex-col md:flex-row justify-center gap-5 max-w-full">
				<Card className="w-full md:w-6/12 h-full">
					<CardContent className="pt-5 flex flex-col h-full justify-between gap-y-3">
						<div className="flex flex-col gap-y-3">
							<h1 className="text-2xl">{t('pages.projects.create_cicd')}</h1>
							<p className="text-gray-500">
								{t('pages.projects.descriptions.create_cicd')}
							</p>
						</div>

						<Button asChild>
							<Link href={`/${lang}/${company}/project/${project}/${namespace}/new/${cicdProjectId?.id}`} prefetch>
								<Plus className="me-2 h-4 w-4 stroke-current" />
								Connect a Repository
							</Link>
						</Button>
					</CardContent>
				</Card>
				<Card className="w-full md:w-6/12 h-full">
					<CardContent className="p-5 flex flex-col h-full justify-between gap-y-3">
						<div className="flex flex-col w-full">
							<h1 className="text-2xl">{t('pages.projects.create_template')}</h1>
							<p className="text-gray-500">{t('pages.projects.descriptions.create_template')}</p>
						</div>

						<div className="flex flex-wrap gap-3 justify-around">
							{data?.data.map((temp, i: number) => i <= 3 && (
								<Link
									href={`/${lang}/${company}/project/${project}/${namespace}/new/${temp.id}`}
									key={temp.label}
									className="text-xl w-5/12 border text-center rounded-xl py-2 font-medium transition-colors hover:text-primary hover:border-primary text-muted-foreground"
								>
									{temp.label}
								</Link>
							))}
						</div>
						<Link
							href={`/${lang}/${company}/project/${project}/${namespace}/new/allTemplates`}
							className="text-lg text-center pb-3 font-medium transition-colors hover:text-primary hover:border-primary text-muted-foreground"
						>
							{t('pages.projects.descriptions.show_all')}
						</Link>

					</CardContent>
				</Card>
			</div>
		</div>
	);
}
