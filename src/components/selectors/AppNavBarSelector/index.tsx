'use client';

import React, { useState } from 'react';
import { List } from '@phosphor-icons/react';
import { useParams, useRouter } from 'next/navigation';

import { appConst } from '@/configs';
import { cn } from '@/lib/Utils/CssUtils';

import { useTranslation } from '@/i18n';

import { Button } from '@/registry/new-york/ui/button';
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from '@/registry/new-york/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/registry/new-york/ui/popover';

export default function AppNavBarSelector() {
	const {
		lang, company, project, namespace,
	} = useParams();
	const router = useRouter();
	const { t } = useTranslation();

	const [openPopover, setOpenPopover] = useState(false);

	return (
		<Popover open={openPopover} onOpenChange={setOpenPopover}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={openPopover}
					aria-label="Select a team"
					className={cn('ml-5 mb-3 md:hidden w-3 flex justify-center items-center')}
				>
					<List className="ml-auto h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandList>
						<CommandGroup>
							{appConst.applicationNavbarItems.map(item => (
								<CommandItem
									key={item.key}
									onSelect={() => {
										router.push(`/${lang}/${company}/project/${project}/${namespace}/${item.key}${item.key === 'setting' ? '/general' : '/list'}`);
									}}
								>
									{t(`navbar.${item.key}`)}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
