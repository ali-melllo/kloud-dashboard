'use client';

import React, { useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { Terminal } from '@xterm/xterm';

import { getStatus } from '@/services/socket/const';

import { Badge } from '@/registry/new-york/ui/badge';

type PropTypes = {
	children?: React.ReactNode;
	modal?: React.ReactNode;
	params: any;
	baseUrl: string;
}

type ParamsType = {
	[key: string]: string;
};

const generateWebSocketUrl = (baseUrl: string, params: ParamsType) => {
	// eslint-disable-next-line no-unused-vars
	const urlParams = Object.entries(params).map(([key, value]) => `${value}`).join('/');
	return `${baseUrl}/${urlParams}`;
};

export default function WsTerminal({
	params,
	children,
	modal,
	baseUrl,
}: PropTypes) {
	const [term, setTerm] = useState<any>(null);
	const [elementWidth, setElementWidth] = useState(0);

	const webSocketUrl = `${generateWebSocketUrl(baseUrl, params)}${elementWidth ? `?cols=${Math.trunc(elementWidth / 9)}&rows=30` : ''}`;

	const {
		lastMessage, readyState, getWebSocket, sendMessage,
	} = useWebSocket(
		webSocketUrl,
		{
			share: true,
		},
	);

	const websocket = getWebSocket();
	const terminalRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (terminalRef.current && term) {
			if (websocket) {
				const customAttachAddon = {
					send: (data: string) => {
						sendMessage(data);
					},
					attach: () => {
						term.onData((data: string) => sendMessage(data));
					},
					dispose: () => {
						term.dispose();
						term.clear();
					},
				};
				customAttachAddon.attach();
				term.resize(Math.trunc(terminalRef.current.offsetWidth / 9) - 5, 30);
				setElementWidth(terminalRef.current.offsetWidth);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [websocket]);

	useEffect(() => {
		if (terminalRef?.current) {
			const terminal = new Terminal({
				scrollback: 10000,
				fontFamily: 'Menlo, Monaco, monospace',
				theme: {
					background: '#000000',
					foreground: '#f0f0f0',
				},
			});

			terminal.open(terminalRef?.current);
			setTerm(terminal);
			return () => {
				if (terminal) {
					terminal.dispose();
				}
				if (websocket) {
					websocket.close();
				}
			};
		}
		return undefined;
	}, []);

	useEffect(() => {
		if (terminalRef.current && term) {
			if (lastMessage !== null) {
				const normalizedData = lastMessage.data
					.replace(/\r(?!\n)/g, '\r\n') // Replace `\r` not followed by `\n` with `\r\n`
					.replace(/(?<!\r)\n/g, '\r\n'); // Replace `\n` not preceded by `\r` with `\r\n`
				term.write(normalizedData);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastMessage]);

	return (
		<div>
			<div className="flex gap-2 items-center">
				<span className="text-gray-400 text-sm mx-1 flex ">Status:</span>
				<Badge className="flex items-center justify-around">
					{getStatus(readyState)}
					<span className={`${readyState === 1 ? 'animate-pulse ml-2 w-3 h-3 bg-black rounded-full' : 'hidden'}`} />
					<span className={`${readyState === 3 ? 'ml-2 w-3 h-3 bg-red-500 rounded-full' : 'hidden'}`} />
				</Badge>
			</div>
			<div className="flex-1 w-full mt-3 space-y-5 h-full">
				{children}
				{modal}
				<div ref={terminalRef} className="w-full !border border-gray-500 p-1 rounded-sm" />
			</div>
		</div>
	);
}
