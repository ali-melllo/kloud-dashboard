'use client';

import React from 'react';
import { LazyLog } from '@melloware/react-logviewer';

import Spinner from '@/components/ui/spinner';

import './styles.css';

type PropTypes = {
	data?: string;
	loading?: boolean;
	stream?: boolean;
	follow?: boolean;
}

export default function TerminalView({
	data, loading, follow, stream,
}: PropTypes) {
	return (
		<div className="root rounded-md overflow-hidden">
			<LazyLog
				loadingComponent={loading ? () => <Spinner className="color-white" /> : null}
				text={data}
				theme="dark"
				enableSearch
				enableSearchNavigation
				stream={stream || false}
				follow={follow || false}
				style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
			// extraLines={1}
			/>
		</div>
	);
}
