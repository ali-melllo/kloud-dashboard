'use client';

import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { dir } from 'i18next';
import { useParams, useRouter } from 'next/navigation';

import { useAppDispatch } from '@/store/hooks';

import { Button } from '@/registry/new-york/ui/button';
import {
	Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/registry/new-york/ui/card';

import InputBlocks from '../controllers/FormView/InputBlocks';
import { InputBlock } from '../controllers/FormView/type';

type ActionButtonsType = {
	label: string;
	onClick?: () => void;
	api?: any;
}

type PropTypes = {
	title: string;
	description: string;
	children?: React.ReactNode;
	redirect?: 'back' | undefined;
	form?: {
		blocks: InputBlock[];
		submitLabel: string;
		api: any;
		transformRequest?: (_: {}) => any;
		onSuccess?: (_: any) => void;
	};
	actionButtons?: ActionButtonsType[]
}

export default function SettingCard({
	title,
	description,
	children,
	form,
	redirect,
	actionButtons,
}: PropTypes) {
	const params = useParams();

	const { handleSubmit, control } = useForm({ mode: 'onSubmit' });
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { lang }: string | any = params;
	const onSubmitHook = useCallback(async (data: {}) => {
		setLoading(true);
		try {
			const newData = form?.transformRequest ? form?.transformRequest(data) : data;
			const response = await dispatch(form?.api.initiate({ ...params, ...newData })).unwrap();
			if (form?.onSuccess) form?.onSuccess(response);
			if (redirect) {
				if (redirect === 'back') router.back();
			}
			setLoading(false);
		}
		catch (err) {
			setLoading(false);
			// notificationProvider.open(err.data);
		}
	}, [form, dispatch, redirect, params, router]);

	return (
		<div dir={dir(lang)} className="w-full  flex flex-col">
			<Card className="w-full flex flex-col border-primary/10">
				<CardHeader className="gap-y-2 mt-1">
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col w-full">
					{children}
					{form && (
						<form key={form.api} onSubmit={handleSubmit(onSubmitHook)}>
							<div className="grid gap-y-5">
								<InputBlocks blocks={form.blocks} control={control} />
							</div>
							<div className="flex mt-3 justify-end">
								{form
									&& (
										<Button
											isLoading={loading}
											disabled={loading}
											type="submit"
										>
											{form.submitLabel}
										</Button>
									)}
							</div>
						</form>
					)}
					{(actionButtons && actionButtons.length > 0)
						&& (
							<div className="flex justify-end gap-x-3 mt-5">
								{actionButtons?.map(item => (
									<Button
										key={item.label}
										onClick={item.onClick ? item.onClick : undefined}
									>
										{item.label}
									</Button>
								))}
							</div>
						)}
				</CardContent>
			</Card>
		</div>
	);
}
