'use client';

import React from 'react';
import ReactJson from '@microlink/react-json-view';

type PropTypes = {
	data: {};
}

export default function JsonView({ data }: PropTypes) {
	return (
		<ReactJson
			style={{ borderRadius: 10 }}
			src={data}
			enableClipboard={false}
			displayObjectSize={false}
			displayDataTypes={false}
			shouldCollapse={false}
		/>
	);
}
