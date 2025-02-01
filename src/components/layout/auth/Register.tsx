'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { useRouter } from 'next-nprogress-bar';

import { userApi } from '@/services/modules/user';

import { cn } from '@/lib/Utils/CssUtils';

import { useTranslation } from '@/i18n';

import { buttonVariants } from '@/registry/new-york/ui/button';

import { FormView, LanguageSelector, ThemeSelector } from '@/components';

import { AuthHeroImage } from './components/HeroImage';

export const metadata: Metadata = {
	title: 'Authentication',
	description: 'Authentication forms built using the components.',
};

export function RegisterLayout() {
	const { t } = useTranslation();
	const router = useRouter();

	return (
		<div className="container relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="fixed end-4 top-4 md:end-8 md:top-8 flex justify-center items-center">
				<ThemeSelector />
				<LanguageSelector />

				<Link href="/auth/login" className={cn(buttonVariants({ variant: 'ghost' }))}>
					{t('pages.signup.signin')}
				</Link>
			</div>

			<AuthHeroImage />
			<div className="lg:p-8 mt-[40vh] lg:mt-0">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							{t('pages.signup.title')}
						</h1>
						<p className="text-sm text-muted-foreground">
							{t('pages.signup.subtitle')}
						</p>
					</div>
					<div>
						<FormView
							submitLabel={t('pages.signup.buttons.submit')}
							api={userApi.endpoints.register}
							onSuccess={data => {
								router.push(`/${data.company}/home`);
							}}
							blocks={[
								{
									type: 'input',
									name: 'general',
									inputs: [{
										name: 'company',
										type: 'text',
										placeholder: t('pages.signup.fields.username'),
										defaultValue: '',
										rules: {
											required: {
												value: true,
												message: t('errors.field_is_required', { field: t('pages.signup.fields.username') }),
											},
										},
									}, {
										name: 'pass',
										type: 'password',
										placeholder: t('pages.signup.fields.password'),
										defaultValue: '',
										rules: {
											required: {
												value: true,
												message: t('errors.field_is_required', { field: t('pages.signup.fields.password') }),
											},
										},
									}, {
										name: 'email',
										type: 'email',
										placeholder: t('pages.signup.fields.email'),
										defaultValue: '',
										rules: {
											required: {
												value: true,
												message: t('errors.field_is_required', { field: t('pages.signup.fields.email') }),
											},
										},
									}],
								}]}
						/>
					</div>

				</div>
			</div>
		</div>
	);
}
