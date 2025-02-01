'use client';

import React from 'react';

type PropTypes = {
	children: React.ReactNode;
	modal: React.ReactNode;
}

export default function ProfileLayout({
	children,
	modal,
}: PropTypes) {
	return (
		<>
			{children}
			{modal}
		</>
	);
}
