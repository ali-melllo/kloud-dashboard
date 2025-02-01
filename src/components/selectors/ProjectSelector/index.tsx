'use client';

import React, { useMemo, useState } from 'react';
import {
	CaretUpDown, PlusCircle,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { useListProjectQuery } from '@/services/modules/projects';

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

type PropTypes = {
	onChange: (_: any) => void;
};

export default function ProjectSelector({ onChange }: PropTypes) {
	const {
		lang, company, project, namespace,
	} = useParams<{ lang: string, company: string, project: string, namespace: string }>();
	const { data } = useListProjectQuery({ company });
	const router = useRouter();
	const { t } = useTranslation();
	const [openPopover, setOpenPopover] = useState(false);
	const [selectedProject, setSelectedProject] = useState<any>(project);

	const projectGroups = useMemo(() => {
		if (!data?.data) return [];
		setSelectedProject(project);
		return data.data;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const currentProject = data?.data.find(x => x.name === project);

	return (
		<>
			<Link href={project ? `/${lang}/${company}/project/${project}/${namespace || currentProject?.namespaces[0]?.name}/overview/list` : '#'}>
				<Button
					variant="outline"
					aria-label="Namespace ..."
					className={cn('w-14 flex overflow-hidden lg:w-[150px] text-xs lg:text-base m-0 text-center')}
				>
					{project || t('pages.projects.select')}
				</Button>
			</Link>

			<Popover open={openPopover} onOpenChange={setOpenPopover}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={openPopover}
						aria-label="Select a Project"
						className={cn(' w-3 lg:w-auto')}
					>
						{/* {selectedProject ? selectedProject : 'Select a Project'} */}
						<CaretUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandList>
							<CommandInput placeholder={t('pages.projects.search')} />
							<CommandEmpty>No Project found.</CommandEmpty>

							{projectGroups.map(proj => (
								<CommandGroup key={proj} heading={proj.label}>
									<CommandItem
										key={proj.name + proj.label}
										onSelect={() => {
											onChange(proj);
											setSelectedProject(proj.project);
											setOpenPopover(false);
										}}
										className={cn(
											'text-sm',
											selectedProject === proj.project ? 'font-bold' : '',
										)}
									>
										{proj.project}

									</CommandItem>

								</CommandGroup>
							))}
						</CommandList>

						<CommandSeparator />
						<CommandList>
							<CommandGroup>
								<CommandItem
									onSelect={() => {
										setOpenPopover(false);
										router.push(`/${lang}/${company}/project/new`);
									}}
								>
									<PlusCircle className="mr-2 h-5 w-5" />
									{t('pages.projects.create')}
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</>
	);
}
