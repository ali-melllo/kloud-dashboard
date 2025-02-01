'use client';

import { supportApi, useGetTicketCategoryQuery } from '@/services/modules/support';

import { useTranslation } from '@/i18n';

import { FormView, Modal } from '@/components';

type PropTypes = {
    params: {
        company: string
    }
}

export default function NewTicketForm({
	params: { company },
}: PropTypes) {
	const { t } = useTranslation();
	const { data } = useGetTicketCategoryQuery({ company });

	return (
		<Modal title={t('tickets.new')}>
			{data?.data && (
				<FormView
					submitLabel={t('tickets.create')}
					api={supportApi.endpoints.createTicket}
					redirect="back"
					requestParams={{ company }}
					transformRequest={comingData => ({ body: comingData })}
					blocks={[
						{
							type: 'input',
							name: 'general',
							inputs: [{
								name: 'body',
								type: 'text',
								label: t('tickets.fields.message'),
								placeholder: t('tickets.fields.message'),
								defaultValue: '',
								rules: {
									required: {
										value: true,
										message: t('errors.field_is_required', { field: t('tickets.fields.message') }),
									},
								},
							}, {
								name: 'title',
								type: 'text',
								label: t('tickets.fields.title'),
								placeholder: t('tickets.fields.title'),
								defaultValue: '',
								rules: {
									required: {
										value: true,
										message: t('errors.field_is_required', { field: t('tickets.fields.title') }),
									},
								},
							}, {
								name: 'category',
								type: 'select',
								label: t('tickets.fields.category'),
								placeholder: t('tickets.fields.category'),
								options: data?.data.map((item: any) => ({ label: item.name, value: item.id })),
								defaultValue: '',
								rules: {
									required: {
										value: true,
										message: t('errors.field_is_required', { field: t('tickets.fields.category') }),
									},
								},
							},
							],
						}]}
				/>
			)}
		</Modal>
	);
}
