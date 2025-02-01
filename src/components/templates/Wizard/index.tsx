'use client';

import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CircleNotch } from '@phosphor-icons/react';
import { dir } from 'i18next';
import { useParams, useRouter } from 'next/navigation';

import { useAppDispatch } from '@/store/hooks';

import { MetaServiceItemType } from '@/services/modules/services/type';

import { appConst } from '@/configs';

import { useTranslation } from '@/i18n';

import { Button } from '@/registry/new-york/ui/button';
import {
	Tabs, TabsContent, TabsList, TabsTrigger,
} from '@/registry/new-york/ui/tabs';

import { Spinner } from '@/components';
import InputBlocks from '@/components/controllers/FormView/InputBlocks';
import { InputPropTypes } from '@/components/controllers/FormView/type';
import SettingCard from '@/components/ui/settingCard';

type PropTypes = {
	params: {};
	api: any;
	submitLabel?: string;
	data: MetaServiceItemType | undefined;
	loading: boolean;
	redirect?: string;
	onSuccess?: (_: any) => void;
	transformRequest?: (_: {}) => any;
}

export default function Wizard({
	params,
	api,
	submitLabel,
	data,
	loading: initialLoading,
	redirect,
	onSuccess,
	transformRequest,
}: PropTypes) {
	const { handleSubmit, control } = useForm({ mode: 'onSubmit' });
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { lang }: string | any = useParams();
	const [selectedService, setSelectedService] = useState<MetaServiceItemType>();
	const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);

	const onSubmitHook = useCallback(async (payload: {}) => {
		setLoading(true);
		try {
			const newData = transformRequest ? transformRequest(payload) : payload;
			const response = await dispatch(api.initiate({ ...params, ...newData })).unwrap();
			if (onSuccess) onSuccess(response);
			if (redirect) {
				if (redirect === 'back') router.back();
			}
			setLoading(false);
		}
		catch (err) {
			setLoading(false);
		}
	}, [api, dispatch, onSuccess, redirect, params, router, transformRequest]);

	const inputs: InputPropTypes[] | any = useMemo(() => {
		if (!data) return [];

		const currentService: MetaServiceItemType = data;

		return currentService.wizard_steps[activeStepIndex]?.fields.map(f => {
			const finalField = {
				name: f.name,
				label: f.label,
				defaultValue: f.default,
				description: f.description,
				placeholder: f.placeholder,
				type: appConst.dynamicFormMap[f.type],
				options: f.values?.map(v => ({ label: v, value: v })),
				rules: {},
			};

			if (f.required) {
				finalField.rules = {
					required: {
						value: true,
						message: t('errors.field_is_required', { field: f.label }),
					},
				};
			}
			setSelectedService(data);
			return finalField;
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, t, activeStepIndex]);

	return (
		initialLoading
			? <CircleNotch className="m-auto h-6 w-6 animate-spin" />
			: (
				<div className="w-full">
					{selectedService
						&& (
							<Tabs value={selectedService?.wizard_steps[activeStepIndex].title} defaultValue={selectedService?.wizard_steps[0].title} className="w-full">
								<>
									<div className="w-full hidden lg:flex items-center mb-5  flex-row justify-between">
										<TabsList dir={dir(lang)} className="w-full flex flex-row justify-start gap-x-3 ">
											{selectedService?.wizard_steps.map((item, i: number) => (
												<TabsTrigger key={item.title} className="px-8" onClick={() => setActiveStepIndex(i)} value={item.title}>
													{item.title}
													{' '}
												</TabsTrigger>
											))}
										</TabsList>
									</div>
									{selectedService?.wizard_steps.map(item => (
										<TabsContent key={item.title} value={item.title}>
											<SettingCard
												title={selectedService.label}
												description={item?.description_long}
											>
												<div className="w-full mt-5">
													{loading ? (
														<Spinner />
													) : data ? (
														selectedService && (
															<form onSubmit={handleSubmit(onSubmitHook)}>
																<div className="grid gap-5">
																	<InputBlocks
																		blocks={[
																			{
																				name: 'general',
																				type: 'input',
																				inputs,
																			},
																		]}
																		control={control}
																	/>

																	<div className={`w-full flex ${activeStepIndex !== 0 ? 'justify-between' : 'justify-end'} mt-5`}>
																		{activeStepIndex !== 0
																			&& (
																				<Button
																					className="w-3/12"
																					variant="outline"
																					onClick={() => setActiveStepIndex(activeStepIndex - 1)}
																				>
																					{t('buttons.previous')}
																				</Button>
																			)}
																		{(activeStepIndex === selectedService.wizard_steps.length - 1)
																			? (
																				<Button
																					className="w-auto"
																					isLoading={loading}
																					disabled={loading}
																					type="submit"
																				>
																					{submitLabel}
																				</Button>
																			) : (
																				<Button
																					className="w-3/12"
																					onClick={() => setActiveStepIndex(activeStepIndex + 1)}
																				>
																					{t('buttons.next')}
																				</Button>
																			)}
																	</div>
																</div>
															</form>
														)
													) : null}
												</div>
											</SettingCard>
										</TabsContent>
									))}
								</>
							</Tabs>
						)}
				</div>
			)
	);
}
