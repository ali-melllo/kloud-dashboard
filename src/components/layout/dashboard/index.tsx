import { PropsWithChildren } from 'react';
import { cookies } from 'next/headers';

import { Inner } from './components/Inner';

type PropTypes = PropsWithChildren & {

};

export default function DashboardLayout({ children }: PropTypes) {
	const layout = cookies().get('dashboard-panel-layout');
	// const collapsed = cookies().get('dashboard-panel-collapsed');

	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
	// const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

	return (
		<div className="flex-col md:flex">
			<Inner
				defaultLayout={defaultLayout}
				// defaultCollapsed={defaultCollapsed}
				// navCollapsedSize={4}
			>
				{children}
			</Inner>
		</div>
	);
}
