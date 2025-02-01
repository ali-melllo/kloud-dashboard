'use client';

import React, { useMemo, useState } from 'react';
import {
	CaretUpDown, PlusCircle,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { useListNamespaceQuery } from '@/services/modules/namespaces';
import { NameSpaceRequestParamType, NameSpaceType } from '@/services/modules/namespaces/type';

import { cn } from '@/lib/Utils/CssUtils';

import { useTranslation } from '@/i18n';

import { Button } from '@/registry/new-york/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/registry/new-york/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/registry/new-york/ui/popover';

type BranchGroups = {
	label: string;
	branches?: NameSpaceType[];
}

type PropTypes = {
	onChange: (_: string) => void;
};

export default function NamespaceSelector({ onChange }: PropTypes) {
	const {
		lang, company, project, namespace,
	} = useParams<NameSpaceRequestParamType>();
	const { data } = useListNamespaceQuery({ project, company });
	const router = useRouter();
	const { t } = useTranslation();

	const [openPopover, setOpenPopover] = useState(false);
	const [selectedBranch, setSelectedBranch] = useState(namespace);

	const branchGroups = useMemo(() => {
		if (!data?.data) return [];

		const bg: BranchGroups[] = [
			{ label: 'production', branches: [] },
			{ label: 'development', branches: [] },
		];

		data.data.forEach(b => {
			const index = b.is_development ? 1 : 0;
			bg[index].branches?.push(b);
		});
		setSelectedBranch(namespace);
		return bg;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<>
			<Link href={`/${lang}/${company}/project/${project}/${namespace}/overview/list`}>
				<Button
					variant="outline"
					aria-label="Namespace ..."
					className={cn('w-14 flex overflow-hidden lg:w-[150px] text-xs lg:text-base m-0 text-center')}
				>
					{selectedBranch}

				</Button>
			</Link>
			<Popover open={openPopover} onOpenChange={setOpenPopover}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={openPopover}
						aria-label="Select a team"
						className={cn(' w-3 lg:w-auto')}
					>
						<CaretUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandList>
							<CommandInput placeholder={t('namespace.search')} />
							<CommandEmpty>No Namespace found.</CommandEmpty>

							{branchGroups.map(bg => (
								<CommandGroup key={bg.label} heading={bg.label}>
									{bg.branches && bg.branches.map(b => (
										<CommandItem
											key={b.name}
											onSelect={() => {
												onChange(b.name);
												setSelectedBranch(b.name);
												setOpenPopover(false);
											}}
											className={cn(
												'text-sm !bg-background cursor-pointer',
												selectedBranch === b.name ? 'font-bold !bg-muted' : '',
											)}
										>
											{b.name}
										</CommandItem>
									))}
								</CommandGroup>
							))}
						</CommandList>

						<CommandSeparator />
						<CommandList>
							<CommandGroup>
								<CommandItem
									onSelect={() => {
										setOpenPopover(false);
										router.push(`/${lang}/${company}/project/${project}/${namespace}/setting/namespace/list`);
									}}
								>
									<PlusCircle className="mr-2 h-5 w-5" />
									{t('namespace.create')}
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</>
	);
}
