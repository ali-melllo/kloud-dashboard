'use client';

import { useGetUserQuery, userApi } from '@/services/modules/user';
import { UserType } from '@/services/modules/user/type';

import { useTranslation } from '@/i18n';

import { FormView } from '@/components';

type PropTypes = {
	params: {
		company: string
	}
}

export default function ProfileUpdateForm({
	params: { company },
}: PropTypes) {
	const { t } = useTranslation();
	const { data } = useGetUserQuery({ company });

	return (
		data?.data && (
			<FormView
				submitLabel={t('pages.profile.update')}
				api={userApi.endpoints.updateUser}
				redirect="back"
				requestParams={{ company }}
				transformRequest={(comingData: UserType) => {
					return {
						body: comingData,
					};
				}}
				blocks={[
					{
						type: 'input',
						name: 'general',
						inputs: [{
							name: 'name',
							type: 'text',
							label: t('pages.profile.fields.name'),
							placeholder: t('pages.profile.fields.name'),
							defaultValue: data?.data.name,
							rules: {
								required: {
									value: true,
									message: t('errors.field_is_required', { field: t('Name') }),
								},
							},
						}, {
							name: 'email',
							type: 'text',
							label: t('pages.profile.fields.email'),
							placeholder: t('pages.profile.fields.email'),
							defaultValue: data?.data.email,
							rules: {
								required: {
									value: true,
									message: t('errors.field_is_required', { field: t('Email') }),
								},
							},
						}, {
							name: 'national_code',
							type: 'text',
							label: t('pages.profile.fields.nationalcode'),
							placeholder: t('pages.profile.fields.nationalcode'),
							defaultValue: data?.data.national_code,
							rules: {
								required: {
									value: true,
									message: t('errors.field_is_required', { field: t('National Code') }),
								},
							},
						}, {
							name: 'economical_number',
							type: 'text',
							label: t('pages.profile.fields.economicalnumber'),
							placeholder: t('pages.profile.fields.economicalnumber'),
							defaultValue: data?.data.economical_number,
							rules: {
								required: {
									value: true,
									message: t('errors.field_is_required', { field: t('Economical Number') }),
								},
							},
						}, {
							name: 'address',
							type: 'text',
							label: t('pages.profile.fields.address'),
							placeholder: t('pages.profile.fields.address'),
							defaultValue: data?.data.address,
							rules: {
								required: {
									value: true,
									message: t('errors.field_is_required', { field: t('Address') }),
								},
							},
						}, {
							name: 'post',
							type: 'text',
							label: t('pages.profile.fields.post'),
							placeholder: t('pages.profile.fields.post'),
							defaultValue: data?.data.post,
							rules: {
								required: {
									value: true,
									message: t('errors.field_is_required', { field: t('Post') }),
								},
							},
						}, {
							name: 'mobile',
							type: 'text',
							label: t('pages.profile.fields.mobile'),
							placeholder: t('pages.profile.fields.mobile'),
							defaultValue: data?.data.mobile,
							rules: {
								required: {
									value: true,
									message: t('errors.field_is_required', { field: t('Mobile') }),
								},
							},
						}, {
							name: 'tel',
							type: 'text',
							label: t('pages.profile.fields.tell'),
							placeholder: t('pages.profile.fields.tell'),
							defaultValue: data?.data.tel,
							rules: {
								required: {
									value: true,
									message: t('errors.field_is_required', { field: t('Telephone') }),
								},
							},
						}, {
							name: 'company',
							type: 'text',
							label: t('pages.profile.fields.company'),
							placeholder: t('pages.profile.fields.company'),
							defaultValue: data?.data.company,
							rules: {
								required: {
									value: true,
									message: t('errors.field_is_required', { field: t('Company') }),
								},
							},
						},
						],
					}]}
			/>
		)
	);
}
