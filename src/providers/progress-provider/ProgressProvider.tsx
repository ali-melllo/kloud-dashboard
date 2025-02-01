'use client';

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

type PropTypes = {
	children: React.ReactNode;
}

export default function ProgressBarProvider({
	children,
}: PropTypes) {
	return (
		<>
			{children}
			<ProgressBar
				height="4px"
				color="#fffd00"
				options={{ showSpinner: false }}
				shallowRouting
			/>
		</>
	);
}
