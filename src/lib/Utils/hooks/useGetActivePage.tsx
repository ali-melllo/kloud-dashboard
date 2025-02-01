import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

type NaveItem = {
	label: string;
	key: string;
};

export type NaveItemsType = readonly NaveItem[];

export function useGetActivePage(navItems: NaveItemsType, pathRange: number) {
	const pathname = usePathname();
	const activePage = useMemo(() => pathname.split('/')[pathRange], [pathname]);

	const pageDetail = useMemo(() => {
		const page = navItems.find(item => item.key === activePage)!;
		return page;
	}, [activePage]);

	return {
		activePage,
		pageDetail,
	};
}
