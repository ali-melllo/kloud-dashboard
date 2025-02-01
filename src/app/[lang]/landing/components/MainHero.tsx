import { useCallback, useEffect, useState } from 'react';
import { Briefcase, Circle, CodeSimple } from '@phosphor-icons/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { useTranslation } from '@/i18n';

import { Button } from '@/registry/new-york/ui/button';

export default function MainHero(props:{ dir: 'ltr' | 'rtl' }) {
	const [windowWidth, setWindowWidth] = useState(0);
	const { t } = useTranslation();
	const { lang } = useParams();
	const router = useRouter();

	useEffect(() => {
		setWindowWidth(window.innerWidth);

		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleNavigateRegister = useCallback(() => {
		router.push(`${lang}/auth/register`);
	}, [lang, props]);

	const handleNavigateLogin = useCallback(() => {
		router.push(`${lang}/auth/login`);
	}, [lang, props]);

	return (
		<>
			<div className="flex flex-col relative mt-5 w-full h-screen z-10 ">
				<div className="mx-0 lg:mx-20 z-20 mt-[27vh] md:mt-[22vh] flex flex-row w-full relative h-4/6">
					<div className="flex flex-col gap-y-5 mt-10 md:mt-0 h-full">
						<Circle color="gray" className={`${props?.dir === 'ltr' ? '-ml-1' : '-mr-1'} -ml-1 w-4 h-4`} />
						<div className="w-1 grow-down bg-gradient-to-b from-transparent to-[#7C72FF] h-3/6" />
						<CodeSimple className={` ${props?.dir === 'ltr' ? '-ml-3' : '-mr-3'} glow !bg-[rgba(140,54,202,0.32)] w-8 h-8`} />
						<div className="w-1 grow-down bg-gradient-to-b from-[#7C72FF] to-[#3fb950] h-3/6 " />
					</div>
					<div className="px-5 h-full smooth-appear w-full">
						<div className="h-3/6 relative w-full">
							<h1 className="text-[1.5em] md:text-[3.5em] lg:text-[5.5em] mt-20 md:-mt-3 font-bold">{t('landing.mainHero.title')}</h1>
							<p className="text-gray-500 md:-mt-3 text-lg w-full lg:w-8/12 md:text-3xl">{t('landing.mainHero.description')}</p>
							<div className="w-full md:w-10/12 flex flex-col gap-y-3 md:gap-y-0 md:flex-row absolute -bottom-0 md:-bottom-12 h-12">
								<Button onClick={handleNavigateRegister} className="h-full text-center w-full md:w-3/12 rounded-r rounded-l-none text-white font-bold text-lg !rounded bg-[#6e40c9] hover:bg-[#512f93]">
									{t('landing.mainHero.signUpTitle')}
								</Button>
								<span className="border-l h-full mx-3 w-1" />
								<Button onClick={handleNavigateLogin} variant="outline" className="h-full text-center text-white font-bold text-lg !rounded border-[#6e40c9]">
									{t('landing.mainHero.trialTitle')}
								</Button>
							</div>
						</div>
					</div>
				</div>

				<Image
					src={windowWidth > 640 ? '/assets/images/landing/main-hero.webp' : '/assets/images/landing/main-hero-mobile.webp'}
					id="heroImage"
					dir={props?.dir}
					className={`absolute ${windowWidth > 640 && props?.dir === 'ltr'
						? '-right-[40vw] top-5'
						: windowWidth > 640 && props?.dir === 'rtl' ? '-left-[40vw] transform scale-x-[-1] top-5 '
							: '-right-0 rounded-lg top-8'}  
						
						flex z-10  h-5/6`}
					height={2000}
					width={2000}
					layout="responsive"
					objectFit="contain"
					alt="kloud"
				/>
			</div>
			<div className="mx-0 lg:mx-20 z-30 -mt-0 md:-mt-[10vh] flex flex-row w-full relative h-[20em] md:h-[30em]">
				<div className="flex flex-col gap-y-5 h-full">
					<Briefcase color="white" className={`${props?.dir === 'ltr' ? '-ml-3' : '-mr-3'} glow-green bg-[rgba(74,202,54,0.23)] w-8 h-8`} />
					<div className="w-1 grow-down bg-gradient-to-b from-[#3FB950] to-transparent h-full" />
				</div>
				<div className="px-5 h-full w-full md:w-8/12">
					<div className="h-full relative">
						<div className="absolute lg:flex flex-col lg:gap-y-3">
							<p className="text-xl lg:text-3xl pl-1">{t('landing.lineCardPaaS.badge')}</p>
							<p className="text-2xl md:text-[3em] text-[#3fb950]">{t('landing.lineCardPaaS.title')}</p>
							<p className="text-2xl md:text-4xl lg:mt-3 font-semibold">{t('landing.lineCardPaaS.description')}</p>
						</div>
					</div>
				</div>
			</div>
		</>

	);
}
