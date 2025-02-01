'use client';

import { useMemo } from 'react';

import { gatewaysApi, useGetGatewayQuery } from '@/services/modules/gateways';

import { TextUtils } from '@/lib/Utils';

import { useTranslation } from '@/i18n';

import { Spinner } from '@/components';

import GatewayForm from '../../Form';

type PropTypes = {
	params: {
		company: string,
		project: string,
		namespace: string,
		gateway: string,
	}
}

export default function GatewayEdit({ params }: PropTypes) {
	const { data, isLoading } = useGetGatewayQuery(params);
	const { t } = useTranslation();
	const transformedData: {
		hostnames: string,
		matches: [],
		backends: [],
		filters: []
	} | any = useMemo(() => {
		if (!data) return undefined;

		const { rules, hostnames } = data.data;

		let finalData = {};

		if (hostnames) {
			finalData = { hostnames };
		}
		if (rules && rules[0]) {
			const { matches, backends, filters } = rules[0];
			if (matches && matches.length) {
				finalData = {
					...finalData,
					matches: matches.map((m: { path: {} }) => ({ ...m.path })),
				};
			}
			if (backends && backends.length) {
				finalData = {
					...finalData,
					backends,
				};
			}
			if (filters && filters.length) {
				const finalFilters: [{ type: string, action: string, name?: string }] = [{ type: '', action: '', name: '' }];
				filters.forEach((f: any) => {
					const type = TextUtils.toLowerFirstLetter(f.type);

					f[type].set?.forEach((s: {}) => {
						finalFilters.push({ type: f.type, action: 'set', ...s });
					});
					f[type].add?.forEach((a: {}) => {
						finalFilters.push({ type: f.type, action: 'add', ...a });
					});
					f[type].remove?.forEach((r: string) => {
						finalFilters.push({ type: f.type, action: 'remove', name: r });
					});
				});

				finalData = {
					...finalData,
					filters: finalFilters,
				};
			}
		}
		return finalData;
	}, [data]);


	return (
		isLoading ? (
			<Spinner />

		) : data ? (
			<GatewayForm
				params={params}
				api={gatewaysApi.endpoints.updateGateway}
				submitLabel={t('buttons.update')}
				defaultValues={transformedData}
			/>
		) : null
	);
}
