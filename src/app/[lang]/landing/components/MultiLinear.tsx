'use client';

import { useInView } from '@/lib/Utils/hooks/useInView';

import MultiLineSvg from './svgs/MultiLineSvg';
import { useTranslation } from '@/i18n';

export default function MultiLinear(data : any) {
	const [ref, isInView] = useInView({
		threshold: 0.1,
	});

	const { t } = useTranslation();

	return (

		<div ref={ref} className="mx-3 lg:mx-20 z-20 flex flex-row w-full overflow-x-hidden items-center relative h-[35em] md:h-[50em]">
			<div
				style={{
					background: `linear-gradient(to bottom, transparent, ${data?.data?.color}, transparent)`,
				}}
				className={`${isInView ? 'grow-down' : '-translate-y-[100%] hidden'} w-1 h-full`}
			/>
			<div className={`${isInView && data.dir === 'ltr' ? 
				'appear-left' : isInView && data.dir === 'rtl' ? 
				'appear-right' : !isInView && data.dir === 'ltr' ? 
				'-translate-x-[100%] hidden' : !isInView && data.dir === 'rtl' ?
				'translate-x-[100%] hidden' : ''}`}>
				<MultiLineSvg dir={data.dir} color={data?.data?.color} />
			</div>
			<div className={`${isInView ? 'smooth-appear' : 'hidden'} flex flex-col mt-12 md:mt-32`}>
				<p style={{ color: data?.data?.color, border: `1px solid ${data?.data?.color}` }} className="text-sm w-6/12 md:w-3/12 md:leading-8 text-center rounded-xl">{t(data?.data?.badge)}</p>
				<p style={{ color: data?.data?.color }} className=" text-[1.8em] md:leading-normal md:text-[4em]">{t(data?.data?.title)}</p>
				<p className="text-[1.2em] md:text-[2em] text-white font-semibold md:w-8/12">{t(data?.data?.description)}</p>
			</div>
		</div>

	);
}
