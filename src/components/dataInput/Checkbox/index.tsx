import React from 'react';

import { Checkbox } from '@/registry/new-york/ui/checkbox';
import { Label } from '@/registry/new-york/ui/label';

function CustomCheckbox({
	name, label, value, onChange,
}: any, _ref: React.Ref<any>) {
	return (
		<div className="flex items-center space-x-2 mt-2">
			<Checkbox ref={_ref} checked={value} onCheckedChange={onChange} />
			{label ? (
				<Label htmlFor={name}>
					{label}
				</Label>
			) : null}

		</div>
	);
}

export default React.forwardRef(CustomCheckbox);
