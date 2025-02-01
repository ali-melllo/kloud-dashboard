import React, { useState } from 'react';
import { X } from '@phosphor-icons/react';

import { cn } from '@/lib/Utils/CssUtils';

import { Badge } from '@/registry/new-york/ui/badge';
import { Button } from '@/registry/new-york/ui/button';
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/registry/new-york/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/registry/new-york/ui/popover';
import { Separator } from '@/registry/new-york/ui/separator';

interface DataTableFacetedFilterProps {
	label?: string
	options: {
		label: string
		value: string
	}[]
}

export function ComboboxDropdownMenu({
	label = 'Type to create',
	options,
	onChange,
	value,
}: DataTableFacetedFilterProps) {
	const [values, setValues] = useState<string[]>(value || []);
	const [currentValue, setCurrentValue] = useState('');
	const currentValueAvailable = values.includes(currentValue);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm" className="h-10 justify-start font-normal shadow-none">
					{values.length > 0 ? (
						<div className="hidden space-x-1 lg:flex">
							{values.map((v, i) => (
								<Badge
									variant="warning"
									key={i}
									className="rounded-sm px-2 font-normal"
									onClick={e => {
										setValues(oldValues => {
											const newValues = [...oldValues].filter(nv => nv !== v);
											onChange(newValues);
											return newValues;
										});
										e.stopPropagation();
									}}
								>
									{v}
									<span className="ps-2">
										<X />
									</span>
								</Badge>
							))}
						</div>
					) : label}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="popover-content-width-same-as-its-trigger p-0" align="start">
				<Command className="border-b-0">
					<CommandInput
						placeholder="Type to create one"
						value={currentValue}
						onValueChange={v => { setCurrentValue(v); }}
					/>

					{values.length || currentValue ? (
						<CommandList>
							{/* <CommandGroup>
									{values.map(value => {
										const isSelected = values.includes(value);
										return (
											<CommandItem
												key={value}
												onSelect={() => {
													if (isSelected) {
														// setValues(v => [...v].filter(nv => nv !== value));
													}
													else {
														// setValues(v => [...v, value]);
													}
												}}
												className="flex justify-between"
											>
												{value}
												<Trash />
											</CommandItem>
										);
									})}
								</CommandGroup> */}

							{currentValue && !currentValueAvailable ? (
								<>
									<Separator />

									<CommandGroup>
										<CommandItem
											className="cursor-pointer"
											onSelect={() => {
												setValues(v => {
													const newValues = [...v, currentValue];
													onChange(newValues);
													return newValues;
												});
												setCurrentValue('');
											}}
										>
											Create
											<Badge className="rounded-sm mx-2 font-normal" variant="warning">
												{currentValue}
											</Badge>
										</CommandItem>
									</CommandGroup>
								</>
							) : null}

						</CommandList>
					) : null}
				</Command>
			</PopoverContent>
		</Popover>
	);
}
