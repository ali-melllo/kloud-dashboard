import { PropsWithChildren } from 'react';
import { useRouter } from 'next-nprogress-bar';

import {
	Dialog,
	DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from '@/registry/new-york/ui/dialog';

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
		<Dialog open onOpenChange={handleOnOpenChange}>
			<DialogContent className="min-w-[700px] max-h-screen ">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 py-2 pb-4">
					{children}
				</div>
			</DialogContent>
		</Dialog>
	);
}
