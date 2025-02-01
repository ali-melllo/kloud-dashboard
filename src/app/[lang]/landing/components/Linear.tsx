import { Lock } from '@phosphor-icons/react';

import { useInView } from '@/lib/Utils/hooks/useInView';
import { useTranslation } from '@/i18n';

function hexToRgba(hex: string, alpha: number = 0.5): string {
	const hexClean = hex.replace('#', '');
	const r = parseInt(hexClean.slice(0, 2), 16);
	const g = parseInt(hexClean.slice(2, 4), 16);
	const b = parseInt(hexClean.slice(4, 6), 16);

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function Linear(data: any) {
	const [ref, isInView] = useInView({
		threshold: 0.1,
	});

	const { t } = useTranslation(); 

	const colorWithTransparency = hexToRgba(data?.data?.color, 0.4);

	return (
		<div ref={ref} className="mx-3 lg:mx-20 z-20 flex flex-row w-full items-center relative h-[35em] md:h-[50em]">
			<div className="flex flex-col gap-y-5 h-full">
				<div
					style={{
						background: `linear-gradient(to bottom, transparent, ${data?.data?.color})`,
					}}
					className="w-1 h-3/6"
				/>
				<Lock
					style={{ background: colorWithTransparency, boxShadow: `${data?.data?.color} 0 0 110px 33px` }}
					className={`${data.dir === 'ltr' ? ' -ml-3' : '-mr-3'} glow-cyan w-8 h-8`}
				/>
				<div
					style={{
						background: `linear-gradient(to bottom, ${data?.data?.color} , transparent)`,
					}}
					className={`w-1 ${isInView ? 'smooth-appear ' : 'hidden'} h-3/6`}
				/>
			</div>
			<div className={`${isInView && data.dir === 'ltr' ? 
				'appear-left flex' : isInView && data.dir === 'rtl' ? 
				'appear-right flex' : !isInView && data.dir === 'ltr' ?
			    '-translate-x-[100%] hidden' : !isInView && data.dir === 'rtl' ? 
			    'translate-x-[100%] hidden' : ''} flex-col mt-14 md:mt-24 px-10`}>
				<p className="text-white text-xl md:text-[2em]">{t(data?.data?.badge)}</p>
				<p style={{color : data?.data?.color}} className={`text-[1.5em] md:text-[3em] font-semibold`}>{t(data?.data?.title)}</p>
				<p className="text-[1.5em] md:text-[3em] font-semibold text-white w-8/12">{t(data?.data?.description)}</p>
			</div>
		</div>
	);
}
