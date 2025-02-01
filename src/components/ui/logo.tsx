import React from 'react';
import Image from 'next/image';

type PropTypes = {
	size?: number;
}

export default function Logo({ size = 50 }: PropTypes) {
	return (
		<span className="flex flex-row justify-center items-center">
			<Image
				src="/assets/images/logo/logo.png"
				width={size}
				height={size}
				alt="kloud logo"
			/>
			<span className="ms-4 pt-1">Kloud</span>
		</span>
	);
}
