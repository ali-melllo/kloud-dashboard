import { ApplicationType } from '@/services/modules/applications/type';
import { BaseListResponses } from '@/services/type';

import { useTranslation } from '@/i18n';

import { Card, CardContent } from '@/registry/new-york/ui/card';

import Chart from '@/components/templates/Chart/OverviewChart';

type PropTypes = {
    data: BaseListResponses<ApplicationType>
}

export default function OverViewCards({ data }: PropTypes) {
	const { t } = useTranslation();
	return (
		<div className="w-full flex flex-col-reverse md:flex-row gap-5">
			<div className="w-full md:w-6/12 flex h-96 flex-col gap-y-3">
				<Card className="w-full h-3/6">
					<CardContent className="pt-5 flex flex-col gap-y-3">
						<h1 className="text-2xl">
							{t('pages.applications.overview.fields.services')}
						</h1>
						<div className="flex gap-x-3 mt-5">
							<p className="text-gray-500">
								{t('pages.applications.overview.fields.cluster_ip')}
								{' '}
								:
							</p>
							<p>{data?.data.meta_service?.clusterIP}</p>
						</div>
						<div className="flex">
							<p className="text-gray-500">
								{t('pages.applications.overview.fields.ports')}
								{' '}
								:
							</p>
							<div className="flex mx-3 flex-col gap-y-2 text-right">
								{data?.data.meta_service?.ports.map(port => (
									<p key={JSON.stringify(port.port)}>{`${port.port} : ${port.targetPort}`}</p>
								))}
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="w-full h-3/6">
					<CardContent className="pt-5 flex flex-col gap-y-3">
						<h1 className="text-2xl">{t('pages.applications.overview.fields.deployments')}</h1>
						<div className="flex mt-5 gap-x-3">
							<p className="text-gray-500">
								{t('pages.applications.overview.fields.replicas')}
								{' '}
								:
							</p>
							<p>{data?.data.meta_deployment?.replicas}</p>
						</div>
						<div className="flex gap-x-3">
							<p className="text-gray-500">
								{t('pages.applications.overview.fields.status')}
								{' '}
								:
							</p>
							{data?.data.meta_deployment && (
								<div className="flex flex-col text-sm gap-y-2 text-right">
									{data?.data.meta_deployment?.status.conditions.map(cond => (
										<p key={JSON.stringify(cond)}>{`${cond.type} : ${cond.status}`}</p>
									))}
								</div>
							)}
							{data?.data.meta_statefulSet && (
								<div className="flex flex-col gap-y-2 text-sm mt-1 text-right">
									<p>
										{t('pages.applications.overview.fields.available_replicas')}
										:
										{data?.data.meta_statefulSet?.status.availableReplicas}
									</p>
									<p>
										{t('pages.applications.overview.fields.replicas')}
										{' '}
										:
										{data?.data.meta_statefulSet?.status.replicas}
									</p>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
			<div className="w-full md:w-6/12 h-96">
				<Chart />
			</div>
		</div>
	);
}
