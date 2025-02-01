'use client';

import { TerminalWindow } from '@phosphor-icons/react';
import Image from 'next/image';

import { ProjectType } from '@/services/modules/projects/type';

import { Badge } from '@/registry/new-york/ui/badge';
import {
	Card,
	CardContent,
} from '@/registry/new-york/ui/card';
import { Input } from '@/registry/new-york/ui/input';

import { CopyButton } from '@/components';

type PropTypes = {
	data: ProjectType,
	onSelect: (_data: ProjectType) => void;
	keyProp:any
}

export default function ProjectListItem({ data, onSelect, keyProp }: PropTypes) {
	const handleSelect = () => {
		onSelect(data);
	};

	return (
		<Card key={keyProp} className="hover:border-primary/40 transition-all duration-200 cursor-pointer" onClick={handleSelect}>
			<CardContent className="pt-5">
				<div className="flex flex-col gap-2 items-start">
					<div className="flex mb-2">
						<div
							className="size-16 bg-background-muted border-input rounded-lg flex items-center justify-center text-3xl me-2 uppercase"
							style={{ borderWidth: 1 }}
						>
							{data.project.charAt(0)}
						</div>
						<div>
							<h1 className="text-2xl mb-1 font-bold tracking-tight">
								{data.project}
							</h1>
							<Badge variant="info">{data.status}</Badge>
						</div>
					</div>
					<div className="flex w-full items-center">
						<Input placeholder="Git url" defaultValue="https://github.com/kloud-team" disabled className=" me-2" />
						<CopyButton value="https://github.com/kloud-team" />
					</div>
					{data ? (
						<div className="flex">
							<div className="flex items-center">
								<Image src="/assets/images/icons/docker.svg" width={27} height={27} className="me-0.5 opacity-80" alt="Docker icon" />
								<span className="text-muted-foreground text-xs">
									{/* Dockerfile */}
									{data.dockerfile}
								</span>
							</div>
							<div className="flex items-center ms-4">
								<TerminalWindow size={20} weight="light" className="me-0.5 opacity-60" />
								<span className="text-muted-foreground text-xs">
									{data.work_directory}
								</span>
							</div>
							<div className="flex items-center ms-4">
								<Badge variant="secondary">{data.project_type}</Badge>
							</div>
						</div>
					) : null}

				</div>
			</CardContent>
		</Card>
	);
}
