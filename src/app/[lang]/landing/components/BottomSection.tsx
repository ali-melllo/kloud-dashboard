import { CodeSimple } from '@phosphor-icons/react';

import { Button } from '@/registry/new-york/ui/button';
import { useTranslation } from '@/i18n';
import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function (props:{ dir: "ltr" | "rtl" } ) {

	const { t } = useTranslation();
	const { lang } = useParams();
	const router = useRouter();

	const handleNavigateRegister = useCallback(() => {
         router.push(`${lang}/auth/register`)
	}, [lang , props])

	const handleNavigateLogin = useCallback(() => {
		router.push(`${lang}/auth/login`)
   }, [lang , props])
 
	return (
		<div className="mx-3 lg:mx-20 z-20 flex flex-row w-full md:w-10/12 items-center relative h-[40vh] md:h-[50vh] ">
			<div className={`flex ${props.dir === 'ltr' ? '-ml-3' : '-mr-3'}  flex-col items-center h-full`}>
				<div className="w-1 bg-gradient-to-b mb-5 from-transparent to-[rgb(210,168,255)] h-full" />
				<CodeSimple className="glow !bg-[rgba(140,54,202,0.32)] mb-2 w-8 h-8" />
			</div>
			<div className="h-full md:px-5 flex flex-col w-full md:w-auto justify-between">
				<h1 className={`text-[1.4em] md:text-[4em] leading-8 pt-5 ${props.dir === 'ltr' ? 'pr-5' : 'pl-5'} md:pr-0 md:pt-16 font-bold md:leading-none`}>{t('landing.footerHero.title')}</h1>
				<p className="text-gray-500 md:-mt-10 text-[0.9em] md:text-[1.4em]">{t('landing.footerHero.description')}</p>
				<div className="w-11/12 mx-2 md:ml-0 flex flex-col gap-y-3 mad:gap-y-0 md:flex-row md:mt-3 h-12">
					<Button onClick={handleNavigateRegister} className={`h-full text-center w-full md:w-3/12 ${props.dir === 'ltr' ? 'rounded-l' : 'rounded-r'} rounded-l-none text-white font-bold text-lg !rounded bg-[#6e40c9] hover:bg-[#512f93]`}>
				       	{t('landing.footerHero.signUpTitle')}
					</Button>
					<span className="border-l h-full mx-3 w-1" />
					<Button onClick={handleNavigateRegister}  variant="outline" className="h-full text-center text-white font-bold text-lg !rounded border-[#6e40c9]">
						{t('landing.footerHero.trialTitle')}
					</Button>
				</div>
			</div>
		</div>
	);
}
