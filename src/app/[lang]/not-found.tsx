'use client';

import { Suspense } from 'react';

import { Authenticated, ErrorComponent } from '@refinedev/core';

export default function NotFound() {
	return (
		<Suspense>
			<Authenticated key="not-found">
				<ErrorComponent />
			</Authenticated>
		</Suspense>
	);
}
