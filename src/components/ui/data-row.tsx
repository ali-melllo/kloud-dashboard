import React from 'react';

type PropTypes = {
	label?: string;
	value?: string;
	icon?: string;
	size?: 'xs' | 'sm' | 'md' | 'xl' | '2xl' | '3xl'
}

export default function DataRow({
	label, value, icon, size = 'sm',
}: PropTypes) {
	return (
		<div className={`text-${size} mb-1 truncate last:mb-0`}>
			{icon || null}
			<span className="font-bold">
				{label}
				{': '}
			</span>
			<span>
				{value}
			</span>
		</div>
	);
}
