/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
	FallbackNs, initReactI18next, useTranslation as useTranslationOrg,
	UseTranslationOptions, UseTranslationResponse,
} from 'react-i18next';
import i18next, { FlatNamespace, KeyPrefix } from 'i18next';
// import LocizeBackend from 'i18next-locize-backend'
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useParams } from 'next/navigation';

import { cookieName, getOptions, languages } from './config';

const runsOnServerSide = typeof window === 'undefined';

// on client side the normal singleton is ok
i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(resourcesToBackend((language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`)))
	.init({
		...getOptions(),
		lng: undefined, // let detect the language on client side
		detection: {
			order: ['path', 'htmlTag', 'cookie', 'navigator'],
		},
		preload: runsOnServerSide ? languages : [],
	});

export function useTranslation<
  Ns extends FlatNamespace,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined
>(
	lng?: string,
	ns?: Ns,
	options?: UseTranslationOptions<KPrefix>,
): UseTranslationResponse<FallbackNs<Ns>, KPrefix> {
	const [cookies, setCookie] = useCookies([cookieName]);
	const { lang: paramLang } = useParams();
	const ret = useTranslationOrg(ns, options);
	const { i18n } = ret;

	const finalLang = lng || paramLang as string;

	if (runsOnServerSide && finalLang && i18n.resolvedLanguage !== finalLang) {
		i18n.changeLanguage(finalLang);
	}
	else {
		const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

		useEffect(() => {
			if (activeLng === i18n.resolvedLanguage) return;
			setActiveLng(i18n.resolvedLanguage);
		}, [activeLng, i18n.resolvedLanguage]);

		useEffect(() => {
			if (!finalLang || i18n.resolvedLanguage === finalLang) return;
			i18n.changeLanguage(finalLang);
		}, [finalLang, i18n]);

		useEffect(() => {
			if (cookies.locale === finalLang) return;
			setCookie(cookieName, finalLang, { path: '/' });
		// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [finalLang, cookies.locale]);
	}
	return ret;
}
