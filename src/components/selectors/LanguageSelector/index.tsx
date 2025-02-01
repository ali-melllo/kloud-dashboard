'use client';

import { GlobeSimple } from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useTranslation } from '@/i18n';
import { languageData, languages, LanguagesType } from '@/i18n/config';

import { Button } from '@/registry/new-york/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/registry/new-york/ui/dropdown-menu';

export default function LanguageSelector() {
	const { i18n } = useTranslation();
	const pathname = usePathname();
	const currentLanguage = i18n.language as LanguagesType;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className='flex justify-start !pl-0 lg:!pl-4' variant="ghost">
					<GlobeSimple className="me-2 h-4 w-4" />
					{' '}
					{languageData[currentLanguage].label}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="" align="end" forceMount>
				<DropdownMenuGroup>
					{languages.map(l => (
						<DropdownMenuItem key={l}>
							<Link href={`${pathname.replace(pathname === `/${currentLanguage}` ? `/${currentLanguage}` : `/${currentLanguage}/`, `/${l}/`)}`} className="w-full">
								{languageData[l].label}
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>

			</DropdownMenuContent>
		</DropdownMenu>
	);
}
