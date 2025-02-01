'use client';

import React from 'react';
import { Icon } from '@phosphor-icons/react';
import Link from 'next/link';

import { cn } from '@/lib/Utils/CssUtils';

import { buttonVariants } from '@/registry/new-york/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/registry/new-york/ui/tooltip';

export type SidebarItemTypes = 	{
	title: string;
	label?: string;
	icon: Icon;
	variant: 'default' | 'ghost';
	href: string;
};

export type PropTypes = {
	isCollapsed: boolean;
	items: SidebarItemTypes[];
}

export function Sidebar({ items, isCollapsed }: PropTypes) {
	return (
		<div
			data-collapsed={isCollapsed}
			className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
		>
			<nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
				{items.map(item => (isCollapsed ? (
					<Tooltip key={item.href} delayDuration={0}>
						<TooltipTrigger asChild>
							<Link
								href={item.href}
								className={cn(
									buttonVariants({ variant: item.variant, size: 'icon' }),
									'h-9 w-9',
									item.variant === 'default'
									&& 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
								)}
							>
								<item.icon className="h-4 w-4" />
								<span className="sr-only">{item.title}</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right" className="flex items-center gap-4">
							{item.title}
							{item.label && (
								<span className="ml-auto text-muted-foreground">
									{item.label}
								</span>
							)}
						</TooltipContent>
					</Tooltip>
				) : (
					<Link
						key={item.href}
						href={item.href}
						className={cn(
							buttonVariants({ variant: item.variant, size: 'sm' }),
							item.variant === 'default'
							&& 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
							'justify-start',
						)}
					>
						<item.icon className="me-2 h-4 w-4" />
						{item.title}
						{item.label && (
							<span
								className={cn(
									'ml-auto',
									item.variant === 'default' && 'text-background dark:text-white',
								)}
							>
								{item.label}
							</span>
						)}
					</Link>
				)))}
			</nav>
		</div>
	);
}
