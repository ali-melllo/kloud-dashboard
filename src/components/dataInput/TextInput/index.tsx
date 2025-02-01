import React from 'react';

import { Input } from '@/registry/new-york/ui/input';

function TextInput(props: any, _ref: React.Ref<any>) {
	return (
		<Input ref={_ref} {...props} />
	);
}

export default React.forwardRef(TextInput);
