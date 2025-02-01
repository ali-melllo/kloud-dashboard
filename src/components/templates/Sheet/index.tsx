import { PropsWithChildren } from 'react';
import { useRouter } from 'next-nprogress-bar';

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/registry/new-york/ui/sheet';

type PropTypes = PropsWithChildren & {
	title?: string;
	description?: string;
	onOpenChange?: (_: boolean) => void;
}

export default function Modal({
	onOpenChange,
	title,
	description,
	children,
}: PropTypes) {
	const router = useRouter();

	const handleOnOpenChange = (open: boolean) => {
		if (onOpenChange) { onOpenChange(open); }
		if (!open) {
			router.back();
		}
	};
	return (
		<Sheet open onOpenChange={handleOnOpenChange}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
					<SheetDescription>{description}</SheetDescription>
				</SheetHeader>

				<div>
					{children}
				</div>
			</SheetContent>
		</Sheet>
	);
}
