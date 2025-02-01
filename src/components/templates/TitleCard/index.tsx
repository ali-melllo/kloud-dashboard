'use client';

import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next-nprogress-bar';

import { useAppDispatch } from '@/store/hooks';

import { useGetActivePage } from '@/lib/Utils/hooks/useGetActivePage';

import { useTranslation } from '@/i18n';

import { Button } from '@/registry/new-york/ui/button';

import InputBlocks from '@/components/controllers/FormView/InputBlocks';
import { InputBlock } from '@/components/controllers/FormView/type';
import Link from '@/components/ui/link';

type PropTypes = {
	navBarItems: readonly { key: string; label: string; }[]
	activePageRange: number;
	buttons?: {
		key: string;
		href?: string;
		label: string;
		icon?: React.ReactNode;
		onClick?: () => any;
		variant?: 'default' | 'outline';
	}[]
	forms?: {
		key: string;
		blocks: InputBlock[];
		submitLabel: string;
		api: any;
		transformRequest?: (_: {}) => any;
		onSuccess?: (_: any) => void;
	}[]
	params?: {}
	hideOnKey?: string[];
}

export default function TitleCard({
	navBarItems,
	activePageRange,
	buttons,
	params,
	forms,
	hideOnKey,
}: PropTypes) {
	const { handleSubmit, control } = useForm({ mode: 'onSubmit' });
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { t } = useTranslation();
	const onSubmitHook = useCallback(async (data: {}, api: any, onSuccess: any) => {
		setLoading(true);
		try {
			const response = await dispatch(api.initiate({ ...params, ...data })).unwrap();
			if (onSuccess) onSuccess(response);
			setLoading(false);
		}
		catch (err) {
			setLoading(false);
		}
	}, [forms, dispatch, params, router]);

	const activePage = useGetActivePage(navBarItems, activePageRange);

	if (!activePage?.pageDetail?.key) {
		return null;
	}

	return (
		!(hideOnKey && hideOnKey?.includes(activePage?.pageDetail?.key))
		&& (
			<div className="flex flex-col md:flex-row w-full justify-between my-0 lg:my-5 mb-10 items-center">
				<h2 className="text-3xl flex justify-center md:justify-start mb-3 lg:mb-0 font-bold tracking-tight w-4/12">
					{t(`navbar.${activePage?.pageDetail.key}`)}
				</h2>

				<div className="flex flex-col gap-y-3 md:gap-y-0 w-full md:flex-row justify-end gap-x-3">
					{(forms && forms.length > 0)
						&& forms?.map(item => (
							activePage?.pageDetail.key === item.key
							&& (
								<form key={item.key} className="w-full" onSubmit={handleSubmit(data => onSubmitHook(data, item.api, item.onSuccess))}>
									<div className={`${'flex flex-col gap-y-3 md:gap-y-0 md:flex-row w-full justify-end gap-x-3 items-center'}`}>
										<InputBlocks blocks={item.blocks} control={control} />
										<div className="flex w-full md:w-auto justify-end">
											<Button
												isLoading={loading}
												className="w-full "
												disabled={loading}
												type="submit"
												variant="outline"
											>
												{item.submitLabel}
											</Button>
										</div>
									</div>
								</form>
							)
						))}

					{(buttons && buttons.length > 0)
						&& buttons.map(item => (
							activePage?.pageDetail.key === item.key
							&& (
								item.href
									? (
										<Link key={item.label} className="text-lg w-full md:w-auto" href={item.href}>
											<Button variant={item.variant || 'default'} className="w-full">
												<span className="me-2">
													{item.icon && item.icon}
												</span>
												{item.label}
											</Button>
										</Link>
									) : (
										<Button variant={item.variant || 'default'} key={item.label} className="w-full md:w-auto" onClick={() => item.onClick && item.onClick()}>
											<span className="me-2">
												{item.icon && item.icon}
											</span>
											{item.label}
										</Button>
									)
							)
						))}
				</div>
			</div>
		)
	);
}
