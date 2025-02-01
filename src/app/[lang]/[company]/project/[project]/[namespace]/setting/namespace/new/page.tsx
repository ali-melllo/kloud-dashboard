'use client';

import { useMemo, useState } from 'react';

import { useListDateCenterQuery } from '@/services/modules/datacenter';
import { namespacesApi } from '@/services/modules/namespaces';

import { useTranslation } from '@/i18n';

import { FormView } from '@/components';

type PropTypes = {
	params: {
		company: string,
		project: string,
		namespace: string
	}
}

export default function NamespaceNew({ params }: PropTypes) {
	const { t } = useTranslation();
	const [dataCenters, setDataCenters] = useState<any>([{ label: '', value: '' }]);

	const { data } = useListDateCenterQuery(params);

	useMemo(() => {
		const options = data?.data.map(item => ({ label: item.name, value: item.id }));
		setDataCenters(options);
	}, [data]);

	return (
		<div>
			<FormView
				submitLabel={t('pages.login.buttons.submit')}
				api={namespacesApi.endpoints.createNamespace}
				redirect="back"
				requestParams={params}
				blocks={[
					{
						type: 'input',
						name: 'general',
						inputs: [{
							name: 'name',
							type: 'text',
							placeholder: t('namespace.name'),
							defaultValue: '',
							rules: {
								required: {
									value: true,
									message: t('errors.field_is_required', { field: t('namespace.name') }),
								},
							},
						}, {
							name: 'branch',
							type: 'text',
							placeholder: t('Branch Name'),
							defaultValue: '',
							rules: {
								required: {
									value: true,
									message: t('errors.field_is_required', { field: t('Branch Name') }),
								},
							},
						}, {
							name: 'req_datacenter',
							type: 'select',
							placeholder: t('namespace.req_datacenter'),
							defaultValue: '',
							options: dataCenters || [],
							rules: {
								required: {
									value: true,
									message: t('errors.field_is_required', { field: t('namespace.req_datacenter') }),
								},
							},
						}],
					}]}
			/>
		</div>
	);
}
