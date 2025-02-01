import React from 'react';

import { ComboboxDropdownMenu } from '@/registry/new-york/ui/combobox';

function MultiSelectInput(props: any, _ref: React.Ref<any>) {
	return (
		<ComboboxDropdownMenu {...props} />
	);
}

export default React.forwardRef(MultiSelectInput);
