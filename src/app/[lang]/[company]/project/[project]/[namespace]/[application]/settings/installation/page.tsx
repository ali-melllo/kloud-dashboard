'use client';

import { useRouter } from 'next/navigation';

import { applicationsApi, useGetApplicationInstallValuesQuery } from '@/services/modules/applications';

import { useTranslation } from '@/i18n';

import Wizard from '@/components/templates/Wizard';

type PropTypes = {
	params: {
		lang: string;
		company: string,
		project: string,
		namespace: string,
		application: string;
	}
}

export default function InstallationForm({
	params,
}: PropTypes) {
	const { data, isLoading } = useGetApplicationInstallValuesQuery(params);
	const { t } = useTranslation();
	const router = useRouter();

	return (
		<div className="w-full">
			{data?.data
				&& (
					<Wizard
						params={params}
						transformRequest={d => {
							return {
								body: {
									...d,
								},
							};
						}}
						submitLabel={t('pages.applications.install')}
						data={data?.data}
						onSuccess={() => router.push(`/${params.lang}/${params.company}/project/${params.project}/${params.namespace}/${params.application}/overview/list`)}
						api={applicationsApi.endpoints.installApplication}
						loading={isLoading}
					/>
				)}
		</div>
	);
}
