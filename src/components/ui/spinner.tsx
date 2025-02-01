import React from 'react';
import { CircleNotch } from '@phosphor-icons/react';

import { cn } from '@/lib/Utils/CssUtils';

type PropTypes = {
	className?: string;
}

export default function Spinner({ className }: PropTypes) {
	return (
		<CircleNotch className={cn(className, 'mr-2 h-4 w-4 animate-spin')} />
	);
}
