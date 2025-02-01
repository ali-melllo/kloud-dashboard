'use client';

import React, { useMemo } from 'react';

import { useGetIdentity } from '@refinedev/core';

import { UserType } from '@/services/modules/user/type';

import { cn } from '@/lib/Utils/CssUtils';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/registry/new-york/ui/select';

type AccountSelectorProps = {
	isCollapsed: boolean
}

export default function AccountSelector({
	isCollapsed,
}: AccountSelectorProps) {
	const { data } = useGetIdentity<UserType>();

	const { accounts, current } = useMemo(() => {
		if (!data) {
			return {
				accounts: [],
				current: undefined,
			};
		}

		const finalAccounts = [{ company: data?.company, email: data?.email, icon: data?.avatar }];
		return {
			accounts: finalAccounts,
			current: finalAccounts[0],
		};
	}, [data]);

	return (
		<Select value={data?.company}>
			<SelectTrigger
				aria-label="Select account"
				className={cn(
					'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
					isCollapsed && 'flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden',
				)}
			>
				<SelectValue placeholder="Select an account">
					{current?.icon}
					<span className={cn('ml-2', isCollapsed && 'hidden')}>
						{current?.company}
					</span>
				</SelectValue>
			</SelectTrigger>

			<SelectContent>
				{accounts.map(account => {
					return (
						<SelectItem key={account.company} value={account.company}>
							<div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
								{account.icon}
								{account.company}
							</div>
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
}
