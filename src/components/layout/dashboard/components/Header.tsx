'use client';

import { useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/Utils/CssUtils';

import { useTranslation } from '@/i18n';

import LanguageSelector from '@/components/selectors/LanguageSelector';
import NamespaceSelector from '@/components/selectors/NamespaceSelector';
import ProjectSelector from '@/components/selectors/ProjectSelector';
import ThemeSelector from '@/components/selectors/ThemeSelector';
import UserNav from '@/components/templates/UserNav';
import Link from '@/components/ui/link';

import { ApplicationNav } from './ApplicationsNav';
import { MainNav } from './MaiNav';

export function Header() {
	const {
		lang, company, project, namespace, application,
	} = useParams();
	const router = useRouter();
	const pathname = usePathname();
	const { t } = useTranslation();
	const activePage = useMemo(() => pathname.split('/')[7], [pathname]);

	const onNamespaceChange = useCallback((namespaceArg: string) => {
		if (application) {
			router.push(`/${lang}/${company}/project/${project}/${namespaceArg}/${application}/${activePage}/list`);
		}
		else {
			router.push(`/${lang}/${company}/project/${project}/${namespaceArg}/overview/list`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activePage, company, project, router]);

	const onProjectChange = useCallback((projectObj:
		{ project: string, namespaces: [{ name: string }] }) => {
		router.push(`/${lang}/${company}/project/${projectObj.project}/${projectObj.namespaces[0]?.name}/overview/list`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activePage, company, project, router]);

	return (
		<div className="border-b w-full">
			<div className="flex w-full h-16 justify-between items-center px-4">
				<div className="flex flex-row items-center">
					<div className={cn('flex h-16 items-center justify-center px-2')}>
						<Link href={`/${lang}/${company}/project/list`}>
							<Image width={40} height={40} alt="Yottab" src="/assets/images/logo/logo.png" />
						</Link>
						<Link className="mx-5 hidden lg:block" href={`/${lang}/${company}/project/list`}>
							{t('pages.projects.title')}
						</Link>
					</div>
					<div className="flex flex-row gap-x-1">
						<ProjectSelector onChange={onProjectChange} />
						{namespace
							&& (
								<>
									<p className="pt-1 text-gray-500"> / </p>
									<NamespaceSelector onChange={onNamespaceChange} />
								</>
							)}
						{application
							&& (
								<>
									<p className="pt-1 text-gray-500"> / </p>
									<Link
										href={`/${lang}/${company}/project/${project}/${namespace}/${application}/overview/list`}
										className="pt-3 lg:pt-1 text-xs lg:text-base "
									>
										{application}
									</Link>
								</>
							)}
					</div>
				</div>
				<div className="flex items-center gap-x-4">
					<div className="hidden lg:block"><ThemeSelector /></div>
					<div className="hidden lg:block"><LanguageSelector /></div>
					<UserNav />
				</div>
			</div>
			<MainNav className="px-8 my-3" />
			<ApplicationNav className="px-8 my-3" />
		</div>
	);
}
