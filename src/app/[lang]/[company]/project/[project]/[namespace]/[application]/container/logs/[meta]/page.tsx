'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

import WsTerminal from '@/components/templates/WsTerminal';

import 'xterm/css/xterm.css';

type PropTypes = {
    params: {
        company: string;
        project: string;
        namespace: string;
        application: string;
        meta: string;
    };
};

export default function LogsTerminal({ params }: PropTypes) {
	const {
		company, project, namespace, application, meta,
	} = params;

	const searchParams = useSearchParams();
	const container = searchParams.getAll('container')[0];

	return (
		<WsTerminal
			baseUrl="wss://kloud.team/api/core/ws-application-logs"
			params={{
				company, project, namespace, application, meta, container,
			}}
		/>
	);
}
