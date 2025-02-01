import { memo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useGetIdentity, useLogout } from '@refinedev/core';

import { UserType } from '@/services/modules/user/type';

import { useTranslation } from '@/i18n';

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/registry/new-york/ui/avatar';
import { Button } from '@/registry/new-york/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/registry/new-york/ui/dropdown-menu';
import ThemeSelector from '@/components/selectors/ThemeSelector';
import LanguageSelector from '@/components/selectors/LanguageSelector';

function UserNav() {
	const { mutate: logout } = useLogout();
	const { data } = useGetIdentity<UserType>();
	const { lang, company } = useParams();
	const { t } = useTranslation();

	if (!data) return null;
	const { name, email, avatar } = data;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage src={avatar} />
						<AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{name}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="w-full cursor-pointer"><Link className="w-full" href={`/${lang}/${company}/profile/detail`}>{t('navbar.profile')}</Link></DropdownMenuItem>
					<DropdownMenuItem className="w-full cursor-pointer"><Link className="w-full" href={`/${lang}/${company}/tickets`}>{t('navbar.tickets')}</Link></DropdownMenuItem>
					<DropdownMenuItem>{t('navbar.settings')}</DropdownMenuItem>
					<DropdownMenuItem className="lg:hidden flex justify-start"><LanguageSelector/></DropdownMenuItem>
					<DropdownMenuItem className="block lg:hidden"><ThemeSelector/></DropdownMenuItem>
					{/* <DropdownMenuItem>New Team</DropdownMenuItem> */}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => logout()}>{t('navbar.logout')}</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default memo(UserNav, () => true);
