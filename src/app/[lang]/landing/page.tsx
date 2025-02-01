'use client';

import { useEffect } from 'react';
import { dir } from 'i18next';
import { useParams } from 'next/navigation';
import { useTheme } from 'next-themes';

import BottomSection from './components/BottomSection';
import Footer from './components/Footer';
import Header from './components/Header';
import Linear from './components/Linear';
import MainHero from './components/MainHero';
import MultiLinear from './components/MultiLinear';
import StickyScroll from './components/StickyScroll';
import { staticData } from './data/const';

import './components/index.css';

export default function Landing() {
	const { lang } : { lang : string } = useParams();
	const direction = dir(lang);
	const { setTheme } = useTheme();

	useEffect(() => {
		setTheme('dark');
	}, []);

	return (
		<div className={`container-landing flex flex-col h-full w-full ${dir(lang) === 'rtl' ? 'font-[Dana]' : 'font-[Ubuntu]'} overflow-x-hidden md:overflow-x-clip`}>
			<Header />

			<MainHero dir={direction} />

			{
				staticData.map(item => (
					item.type === 'sticky' ? (
						<StickyScroll
							key={`sticky-${Math.random()}`}
							dir={direction}
							data={item.data}
						/>
					) : item.type === 'multiLine' ? (
						<MultiLinear
							key={`multiLine-${Math.random()}`}
							dir={direction}
							data={item.data}
						/>
					) : item.type === 'line' ? (
						<Linear
							key={`line-${Math.random()}`}
							dir={direction}
							data={item.data}
						/>
					) : null
				))
			}

			<BottomSection dir={direction} />

			<Footer />
		</div>
	);
}
