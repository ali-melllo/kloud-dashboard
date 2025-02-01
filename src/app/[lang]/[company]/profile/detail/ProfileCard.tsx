import { UserType } from '@/services/modules/user/type';

import { useTranslation } from '@/i18n';

import ProfileDetailLoading from '../../components/profile/ProfileDetailLoading';

type propType = {

	data: UserType | undefined

	loading: boolean
}

export default function ProfileCard({ data, loading }: propType) {
	const { t } = useTranslation();
	return (
		loading
			? (
				<ProfileDetailLoading />
			)
			: data
				? (
					<div className="flex flex-col gap-y-4 text-lg">
						<div className="flex flex-row gap-x-3">
							<p className="text-muted-foreground">
								{t('pages.profile.fields.name')}
								{' '}
								:
							</p>
							<p>{data?.name}</p>
						</div>
						<div className="flex flex-row gap-x-3">
							<p className="text-muted-foreground">
								{t('pages.profile.fields.email')}
								{' '}
								:
							</p>
							<p>{data?.email}</p>
						</div>
						<div className="flex flex-row gap-x-3">
							<p className="text-muted-foreground">
								{t('pages.profile.fields.nationalcode')}
								{' '}
								:
							</p>
							<p>{data?.national_code}</p>
						</div>
						<div className="flex flex-row gap-x-3">
							<p className="text-muted-foreground">
								{' '}
								{t('pages.profile.fields.cash')}
								:
							</p>
							<p>{data?.cash}</p>
						</div>
						<div className="flex flex-row gap-x-3">
							<p className="text-muted-foreground">
								{' '}
								{t('pages.profile.fields.company')}
								:
							</p>
							<p>{data?.company}</p>
						</div>
						<div className="flex flex-row gap-x-3">
							<p className="text-muted-foreground">
								{' '}
								{t('pages.profile.fields.tell')}
								:
							</p>
							<p>{data?.tel}</p>
						</div>
						<div className="flex flex-row gap-x-3">
							<p className="text-muted-foreground">
								{' '}
								{t('pages.profile.fields.mobile')}
								:
							</p>
							<p>{data?.mobile}</p>
						</div>
						<div className="flex flex-row gap-x-3">
							<p className="text-muted-foreground">
								{' '}
								{t('pages.profile.fields.post')}
								:
							</p>
							<p>{data?.post}</p>
						</div>
						<div className="flex flex-row gap-x-3">
							<p className="text-muted-foreground">
								{' '}
								{t('pages.profile.fields.address')}
								:
							</p>
							<p>{data?.address}</p>
						</div>
						<div className="flex flex-row gap-x-3">
							<p className="text-muted-foreground">
								{' '}
								{t('pages.profile.fields.economicalnumber')}
								:
							</p>
							<p>{data?.economical_number}</p>
						</div>
					</div>
				) : null
	);
}
