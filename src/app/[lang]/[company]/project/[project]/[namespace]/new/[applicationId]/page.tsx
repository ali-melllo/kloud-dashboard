'use client';

import { useRouter } from 'next/navigation';

import { applicationsApi } from '@/services/modules/applications';
import { useGetMetaServiceQuery } from '@/services/modules/services';

import { useTranslation } from '@/i18n';

import Wizard from '@/components/templates/Wizard';

type PropTypes = {
	params: {
		lang:string;
		company: string,
		project: string,
		namespace: string,
		service?: string;
		applicationId: string;
		application: string;
	}
}

export default function ApplicationForm({
	params: {
		company, project, namespace, applicationId, application, lang,
	},
}: PropTypes) {
	const { data, isLoading } = useGetMetaServiceQuery({ company, project, namespace });
	const { t } = useTranslation();
	const router = useRouter();

	return (
		<div className="w-full">
			{data?.data
				&& (
					<Wizard
						params={{
							company, project, namespace, application,
						}}
						transformRequest={d => {
							return {
								body: {
									spec: d,
									type: data?.data.find(x => x.id === applicationId)?.type,
								},
							};
						}}
						onSuccess={() => router.push(`/${lang}/${company}/project/${project}/${namespace}/overview/list`)}
						submitLabel={t('pages.applications.new')}
						data={data?.data.find(x => x.id === applicationId)}
						api={applicationsApi.endpoints.createApplication}
						loading={isLoading}
					/>
				)}
		</div>
	);
}
