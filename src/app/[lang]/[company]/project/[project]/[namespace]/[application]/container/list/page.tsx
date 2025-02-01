'use client';

import { useEffect } from 'react';
import { Info } from '@phosphor-icons/react';
import { dir } from 'i18next';
import Link from 'next/link';

import { useGetApplicationQuery } from '@/services/modules/applications';

import { useTranslation } from '@/i18n';

import { Button } from '@/registry/new-york/ui/button';
import {
	Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/registry/new-york/ui/card';

type PropTypes = {
	params: {
		company: string;
		project: string;
		namespace: string;
		application: string;
		lang:string;
	};
};

export default function TerminalList({ params }: PropTypes) {
	const {
		lang, company, project, namespace, application,
	} = params;

	const { data, refetch } = useGetApplicationQuery({
		company, project, namespace, application,
	}, { skip: !namespace });

	useEffect(() => {
		if (namespace) {
			refetch();
		}
	}, [namespace, refetch]);

	const { t } = useTranslation();

	return (
		<>
			{(data?.data && data?.data.running) && (
				<div className="w-full flex justify-center mt-5">
					<Card className="w-full">
						<CardContent className="p-5 flex flex-col gap-y-3">
							{data?.data.meta_pods?.map(pod => (
								pod.containers.map(cont => (
									<div key={cont.name} className="md:h-12 flex gap-y-7 md:gap-y-0 flex-col md:flex-row items-center justify-between px-5">
										<div className="w-full md:w-3/12 flex flex-row relative gap-x-3">
											<p className="text-gray-500">
												{t('pages.terminal.fields.containers')}
												{' '}
												:
											</p>
											<div className="flex flex-col gap-y-1">
												{cont.name}
												<p className={`text-[0.6em] ${dir(lang) === 'ltr' ? 'left-0' : 'right-0'} text-gray-500 absolute top-6 md:top-8`}>{pod.name}</p>
											</div>
										</div>
										<div className="w-full md:w-2/12 flex flex-row justify-start md:justify-center gap-x-3">
											<p className="text-gray-500">
												{t('pages.terminal.fields.node_name')}
												{' '}
												:
											</p>
											<p>{pod.nodeName}</p>
										</div>
										<div className="w-full md:w-3/12 flex flex-row justify-start md:justify-end gap-x-3">
											<p className="text-gray-500">
												{t('pages.terminal.fields.restart_policy')}
												{' '}
												:
											</p>
											<p>{pod.restartPolicy}</p>
										</div>
										<div className="w-full md:w-4/12 flex flex-row justify-between md:justify-end gap-x-3">
											<Button className="cursor-pointer" asChild>
												<Link href={`logs/${pod.name}?container=${cont.name}`}>
													{' '}
													{t('pages.terminal.fields.logs')}
												</Link>
											</Button>
											<Button className="cursor-pointer" asChild>
												<Link href={`terminal/${pod.name}?container=${cont.name}`}>
													{' '}
													{t('pages.terminal.fields.terminal')}
												</Link>
											</Button>
											<Button className="cursor-pointer" asChild>
												<Link href={`files/${pod.name}?container=${cont.name}`}>
													{' '}
													{t('pages.terminal.fields.files')}
												</Link>
											</Button>
										</div>
									</div>
								))
							))}
						</CardContent>
					</Card>
				</div>
			)}
			{
				(data?.data && !data?.data.running) && (
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
				)
			}
		</>
	);
}
