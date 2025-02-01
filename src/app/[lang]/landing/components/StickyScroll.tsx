'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { useTranslation } from '@/i18n';

export default function StickyScroll(data: any) {
	const [_, setIsSticky] = useState(false);
	const firstItemRef = useRef(null);

	const { t } = useTranslation();
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsSticky(!entry.isIntersecting);
			},
			{
				root: null,
				threshold: 0,
			},
		);

		if (firstItemRef.current) {
			observer.observe(firstItemRef.current);
		}

		return () => {
			if (firstItemRef.current) {
				observer.unobserve(firstItemRef.current);
			}
		};
	}, []);

	return (
		<div className="flex md:p-5 w-full lg:p-0 flex-col-reverse lg:flex-row lg:gap-x-24 md:py-20 ">
			{/* Scrollable List */}
			<div className="w-full lg:w-2/4 flex flex-col items-end md:px-5">
				{data?.data?.list.map((item: any, i: number) => (item.type === 'image' ? (
					<div
						key={`scroll-image${Math.random()}`}
						ref={i === 0 ? firstItemRef : null}
						className=" flex flex-col mt-10 lg:mt-0 hover:bg-secondary border-b mb-5 p-5 pt-0 cursor-pointer transition-all duration-200 w-full"
					>
						<div className="w-full flex">
							<Image
								src={item.url}
								className="w-full h-full max-h-80 rounded"
								width={700}
								height={500}
								alt="kloud"
							/>
						</div>
						<p className="text-xl md:text-3xl leading-6 md:-mt-5 mx-auto font-semibold tabular-nums md:leading-none">
							{t(item.title)}
						</p>
						<p className={`text-gray-300 font-[DanaLight] leading-[1.5em] md:leading-6 mt-3 ${data?.dir === 'ltr' ? 'text-left' : 'text-right'}  mx-auto text-sm md:text-lg leading-none`}>
							{t(item.description)}
						</p>
					</div>
				) : (
					<div
						key={`scroll-list${Math.random()}`}
						ref={i === 0 ? firstItemRef : null}
						className=" flex flex-row p-5 hover:underline decoration-[#3cffd0] underline-offset-4 border-b bg-muted-background cursor-pointer transition-all duration-200 w-full "
					>
						<div className="w-full md:w-9/12 flex flex-col justify-start">
							<p className="text-lg md:text-2xl leading-6 font-semibold tabular-nums md:leading-none">
								{t(item.title)}
							</p>
							<p className={`text-gray-300 leading-5 md:leading-6 ${data?.dir === 'ltr' ? 'pr-3' : 'pl-4'} font-[DanaLight] mt-2 text-sm md:text-lg`}>
								{t(item.description)}
							</p>
						</div>
						<div className="w-4/12 md:w-3/12 flex justify-end items-center">
							<Image
								className="rounded-xl"
								src={item.url}
								width={100}
								height={100}
								alt="kloud"
							/>
						</div>
					</div>
				)))}
			</div>

			{/* Sticky Div */}
			<div
				className="w-full lg:w-2/4 h-full transition-all duration-300 lg:sticky z-20 top-48 flex justify-start items-center"
			>
				<div style={{ background: data?.data?.stickyItem.background, color: data?.data?.stickyItem.textColor || '#000000' }} className="w-full p-5 rounded-2xl">
					<p style={{ borderColor: data?.data?.stickyItem.textColor }} className={`text-xl lg:text-4xl leading-7 p-5  ${data?.dir === 'ltr' ? 'border-l ml-5 md:ml-10' : 'text-right border-r mr-5 md:mr-10'} font-semibold tabular-nums leading-none`}>
						{t(data?.data?.stickyItem.title)}
					</p>
					<div className="w-full flex justify-start mt-3">
						<Image
							src={t(data?.data?.stickyItem.image)}
							className="w-10/12 max-h-64 rounded"
							width={400}
							height={100}
							alt="kloud"
						/>
					</div>
					<div className="font-semibold flex flex-col md:px-5">
						<div className="flex flex-row py-5">
							<div className="pt-5">
								<span style={{ background: data?.data?.stickyItem.textColor || '#000000' }} className="flex h-2 w-2 rounded-full" />
							</div>
							<div className="flex flex-col font-[DanaLight] mx-5 md:mx-10">
								<p className="font-semibold text-base md:text-lg">{t(data?.data?.stickyItem.description)}</p>
								{data?.data?.stickyItem.descriptionList.map((item:string) => (
									<p key={item} className="text-sm font-thin">{t(item)}</p>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
