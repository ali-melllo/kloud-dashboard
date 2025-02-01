'use client';

import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next-nprogress-bar';

import { useAppDispatch } from '@/store/hooks';

import { Button } from '@/registry/new-york/ui/button';

import InputBlocks from './InputBlocks';
import { FormViewPropType } from './type';

export default function FormView({
	blocks,
	submitLabel = 'Submit',
	transformRequest,
	onSuccess,
	resetOnSuccess,
	api,
	requestParams,
	redirect,
	className,
	hideButton,
}: FormViewPropType) {
	const { handleSubmit, control, reset } = useForm({ mode: 'onSubmit' });
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const onSubmitHook = useCallback(async (data: {}) => {
		setLoading(true);
		try {
			const newData = transformRequest ? transformRequest(data) : data;
			const response = await dispatch(api.initiate({ ...requestParams, ...newData })).unwrap();
			if (onSuccess) onSuccess(response);
			if (redirect) {
				if (redirect === 'back') router.back();
				else router.push(redirect);
			}
			if (resetOnSuccess) {
				const resetData = Object.keys(data).reduce((acc : any, key) => {
					acc[key] = '';
					return acc;
			  }, {});
			  reset(resetData);
			}

			setLoading(false);
		}
		catch (err) {
			setLoading(false);
		}
	}, [api, dispatch, onSuccess, redirect, requestParams, router, transformRequest]);

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmitHook)}>
				<div className={`${className || 'grid gap-5'}`}>
					<InputBlocks blocks={blocks} control={control} />

					<div className="flex justify-end">
						{!hideButton
							&& (
								<Button
									isLoading={loading}
									className="w-full"
									disabled={loading}
									type="submit"
								>
									{submitLabel}
								</Button>
							)}
					</div>
				</div>
			</form>
		</div>
	);
}
