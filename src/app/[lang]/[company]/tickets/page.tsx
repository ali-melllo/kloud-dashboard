'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useListTicketsQuery } from '@/services/modules/support';

import { cn } from '@/lib/Utils/CssUtils';

import { useTranslation } from '@/i18n';

import { Badge } from '@/registry/new-york/ui/badge';
import { Card } from '@/registry/new-york/ui/card';
import { ScrollArea } from '@/registry/new-york/ui/scroll-area';

type PropTypes = {
	children: React.ReactNode;
	modal?: React.ReactNode;
}

export default function TicketsPage({ children, modal }: PropTypes) {
	const { t } = useTranslation();
	const { lang, company, id } = useParams<{ id?: string; company: string, lang: string }>();
	const { data } = useListTicketsQuery({ company });

	return (
		<div className="h-screen">
			<div className="flex flex-col items-center gap-y-3 md:gap-y-0 md:items-start md:flex-row gap-x-5 w-full h-full md:h-4/6 rounded-xl">
				<div className="w-full md:w-3/12 flex flex-col border rounded-xl gap-y-3 p-1 mx-3 h-3/6 md:h-full">
					<Card className="text-xl border-0 rounded-lg border-b-1 py-3 px-5 font-semibold tracking-tight">
						{t('tickets.topics')}
					</Card>
					<ScrollArea>
						{data?.data.topics.map(item => (
							<Link
								href={`/${lang}/${company}/tickets/${item.id}`}
								key={item.id}
								className={cn(
									'flex flex-col my-2 items-start gap-2 rounded-lg border mx-3 p-3 text-left text-sm transition-all hover:bg-accent',
								)}
							>
								<div className="flex w-full flex-col gap-1">
									<div className="flex items-center">
										<div className="flex items-center gap-2">
											<div className="font-semibold">{item.title}</div>
											{!item.read && (
												<span className="flex h-2 w-2 rounded-full bg-primary" />
											)}
										</div>
										<div
											className={cn(
												'ml-auto text-xs text-muted-foreground',
											)}
										>
											{new Date(item.time).toLocaleDateString()}
										</div>
									</div>
									<div className="text-xs font-medium">{item.subject}</div>
								</div>
								<div className="line-clamp-2 text-xs text-muted-foreground">
									{item.text?.substring(0, 300)}
								</div>
								<div className="flex items-center gap-2">
									<Badge>
										{item.status}
									</Badge>
								</div>
							</Link>

						))}
					</ScrollArea>
				</div>
				<div className="w-full md:w-9/12 h-3/6 md:h-full flex border rounded-xl">
					{!id && (
						<p className="m-auto">
							{t('tickets.choose')}
						</p>
					)}
					{children}
					{modal}
				</div>
			</div>
		</div>
	);
}
