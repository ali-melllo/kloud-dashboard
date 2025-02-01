'use client';

import dataProviderSimpleRest from '@refinedev/simple-rest';

import { axiosInstance } from '@/services/fetchBase';

import { appConfig } from '@/configs';

export const dataProvider = dataProviderSimpleRest(appConfig.API_URL, axiosInstance);
