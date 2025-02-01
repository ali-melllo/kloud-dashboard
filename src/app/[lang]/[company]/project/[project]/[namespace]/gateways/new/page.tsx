/* eslint-disable react/no-unescaped-entities */

'use client';

import React from 'react';
import { Plus } from '@phosphor-icons/react';

import { useTranslation } from '@/i18n';

import { Button } from '@/registry/new-york/ui/button';
import { Card, CardContent } from '@/registry/new-york/ui/card';

import Link from '@/components/ui/link';

export default function GatewayNew() {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col md:flex-row h-3/6 items-center justify-center gap-5 max-w-full">
			<Card className="w-full md:w-6/12 h-full md:h-5/6">
				<CardContent className="pt-5 flex flex-col h-full justify-between gap-y-3">
					<div className="flex text-xs text-gray-500 flex-col gap-y-3">
						<h1 className="text-2xl text-primary">{t('pages.gateways.routing')}</h1>
						<p className="">
							{t('pages.gateways.routingDescription')}
						</p>
						<p className="mt-3">
							{t('pages.gateways.routingExampleDescription')}
						</p>
						<ul className="list-disc px-5 md:px-10">
							<li>
								Traffic to
								<span className="bg-muted p-1 rounded-xl">'foo.example.com/login'</span>
								{' '}
								is forwarded to 'foo-svc'
							</li>
							<li>
								Traffic to
								<span className="bg-muted p-1 rounded-xl">'bar.example.com/shop'</span>
								{' '}
								is forwarded to 'shop-svc'
							</li>
							<li>
								Traffic to
								<span className="bg-muted p-1 rounded-xl">'bar.example.com/*'</span>
								{' '}

								with a 'env: canary' header is
								forwarded to 'bar-svc-canary'
							</li>
						</ul>
					</div>

					<Button asChild>
						<Link href="new/routing">
							<Plus className="me-2 h-4 w-4 stroke-current" />
							{t('buttons.add')}
						</Link>
					</Button>
				</CardContent>
			</Card>
			<Card className="w-full md:w-6/12 h-5/6">
				<CardContent className="pt-5 flex flex-col h-full justify-between gap-y-3">
					<div className="flex flex-col gap-y-3">
						<h1 className="text-2xl">{t('pages.gateways.redirect')}</h1>
						<p className="text-gray-500 text-xs">
							{t('pages.gateways.redirectDescription')}
						</p>
					</div>
					<Button asChild>
						<Link href="new/redirect">
							<Plus className="me-2 h-4 w-4 stroke-current" />
							{t('buttons.add')}
						</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
