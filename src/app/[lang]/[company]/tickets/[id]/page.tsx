'use client';

import React, { useCallback, useState } from 'react';
import { Pen } from '@phosphor-icons/react';

import { notificationProvider } from '@/providers/notificationProvider';

import { useAppDispatch } from '@/store/hooks';

import { supportApi, useGetTicketQuery } from '@/services/modules/support';

import { useTranslation } from '@/i18n';

import { Button } from '@/registry/new-york/ui/button';
import { Card } from '@/registry/new-york/ui/card';

import Container from '../page';

type PropTypes = {
	params: {
		company: string;
		id: string;
	}
}

export default function TicketsRoom({
	params: { company, id },
}: PropTypes) {
	const { data } = useGetTicketQuery({ id, company });
	const [textMessage, setTextMessage] = useState<string>('');
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const sendMessageHandler = useCallback(async () => {
		try {
			await dispatch(
				supportApi.endpoints.updateTicket.initiate({ company, id, body: { body: textMessage } }),
			).unwrap();
			notificationProvider.open({
				type: 'success', message: t('tickets.notifications.ticketsent'),
			});
			setTextMessage('');
		}
		catch (err) { /* check error */ }
	}, [textMessage, company, dispatch, id]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setTextMessage(value);
	};

	return (
		<Container>
			{data?.data && (
				<Card className="w-full flex flex-col relative title h-full">
					<h2 className="text-lg border-b px-5 py-3 font-semibold tracking-tight">
						{data?.data.title}
						<span className="text-sm text-muted-foreground mx-3">{new Date(data?.data.time).toLocaleString()}</span>
					</h2>
					<div className="flex flex-col gap-y-3 overflow-y-scroll px-5 pb-32 py-10">
						{data?.data.messages.map(item => (
							<p
								key={JSON.stringify(item)}
								className={`p-3 flex justify-end bg-muted rounded-xl
                                 ${item.user.is_admin ? '!rounded-tl-none mr-10 md:mr-64 flex-row-reverse' : '!rounded-tr-none ml-10 md:ml-64 flex-row '} `}
							>
								<span className="text-xs text-muted-foreground mx-3 pt-1">{new Date(item.time).toLocaleTimeString()}</span>
								{item.body}
							</p>
						))}
					</div>
					<div className="w-full h-10 gap-x-3 px-3 absolute bottom-3 items-center flex justify-between">
						<input
							value={textMessage}
							onChange={handleInputChange}
							placeholder={t('tickets.sendMessage')}
							className="w-8/12 md:w-9/12 h-full bg-muted border rounded-xl outline-none px-5"
						/>
						<Button onClick={sendMessageHandler} className="w-4/12 md:w-3/12">
							<Pen className="me-2 h-4 w-4 stroke-current" />
							{t('tickets.sendMessage')}
						</Button>

					</div>
				</Card>
			)}
		</Container>
	);
}
