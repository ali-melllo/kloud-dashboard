import { PropsWithChildren } from 'react';
import NextLink, { LinkProps } from 'next/link';

type PropTypes = PropsWithChildren<LinkProps> & {
	className?: string;
}

export default function Link({ children, ...restProps }: PropTypes) {
	return (
		<NextLink {...restProps}>
			{children}
		</NextLink>
	);
}
