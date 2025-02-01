'use client';

import * as React from 'react';
import { Check, Clipboard } from '@phosphor-icons/react';

import { cn } from '@/lib/Utils/CssUtils';

import { Button } from '@/registry/new-york/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york/ui/tooltip';

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  src?: string
  variant?: string
}

export default function CopyButton({
	value,
	className,
	variant,
	...props
}: CopyButtonProps) {
	const [hasCopied, setHasCopied] = React.useState(false);

	React.useEffect(() => {
		setTimeout(() => {
			setHasCopied(false);
		}, 2000);
	}, [hasCopied]);

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					size="icon"
					variant={variant || 'default'}
					className={cn(
						'relative z-10 h-8 w-8',
						className,
					)}
					onClick={e => {
						e.stopPropagation();
						navigator.clipboard.writeText(value);
						setHasCopied(true);
					}}
					{...props}
				>
					<span className="sr-only">Copy</span>
					{hasCopied ? <Check className="h-5 w-5" /> : <Clipboard className="h-5 w-5" />}
				</Button>
			</TooltipTrigger>

			<TooltipContent>Copy code</TooltipContent>
		</Tooltip>
	);
}
