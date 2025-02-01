import { Card } from '@/registry/new-york/ui/card';
import { Skeleton } from '@/registry/new-york/ui/skeleton';

type propType = {
	className?: string
}

export default function LoadingCart({ className }: propType) {
	return (
		<Card className={`${className || 'w-4/12 h-48'} rounded-xl flex flex-col justify-around  border p-5 border-muted`}>
			<div className="flex flex-row gap-x-4">
				<Skeleton className="w-16 rounded-xl h-16 bg-muted" />
				<Skeleton className="w-44 mt-3 rounded-xl h-4 bg-muted" />
			</div>
			<Skeleton className="w-64 mt-3 rounded-xl h-4 bg-muted" />
			<Skeleton className="w-full mt-3 rounded-xl h-4 bg-muted" />
		</Card>
	);
}
