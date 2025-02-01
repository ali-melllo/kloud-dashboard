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

export function AuthLayout() {
	const { t } = useTranslation();
	const router = useRouter();

	return (
		<div className=" relative h-full w-full flex flex-col justify-between p-5 lg:p-0 lg:flex-row items-center lg:max-w-none ">
			<div className="absolute end-4 top-4 md:end-8 md:top-8 flex justify-center items-center">
				<ThemeSelector />
				<LanguageSelector />

				<Link href="/auth/register" className={cn(buttonVariants({ variant: 'ghost' }))}>
					{t('pages.login.signup')}
				</Link>
			</div>

			<div className="lg:w-6/12">
				<AuthHeroImage />
			</div>

			<div className="lg:p-8 w-full lg:w-6/12 h-screen flex justify-center items-center">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							{t('pages.login.title')}
						</h1>
						<p className="text-sm text-muted-foreground">
							{t('pages.login.subtitle')}
						</p>
					</div>
					<div>
						<FormView
							submitLabel={t('pages.login.buttons.submit')}
							api={userApi.endpoints.login}
							onSuccess={data => {
								router.push(`/${data.company}/project/list`);
							}}
							blocks={[
								{
									type: 'input',
									name: 'general',
									inputs: [{
										name: 'company',
										type: 'text',
										placeholder: t('pages.login.fields.username'),
										defaultValue: '',
										rules: {
											required: {
												value: true,
												message: t('errors.field_is_required', { field: t('pages.login.fields.username') }),
											},
										},
									}, {
										name: 'pass',
										type: 'password',
										placeholder: t('pages.login.fields.password'),
										defaultValue: '',
										rules: {
											required: {
												value: true,
												message: t('errors.field_is_required', { field: t('pages.login.fields.password') }),
											},
										},
									}],
								}]}
						/>
					</div>

					{/* <AuthPrivacyParagraph /> */}
				</div>
			</div>
		</div>
	);
}
