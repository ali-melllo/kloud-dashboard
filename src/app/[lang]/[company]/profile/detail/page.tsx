'use client';

import React from 'react';

import { useGetUserQuery } from '@/services/modules/user';

import { Card, CardContent } from '@/registry/new-york/ui/card';

import ProfileCard from './ProfileCard';

type PropTypes = {
	params: {
		company: string;
	}
}

export default function ProfileDetail({
	params: { company },
}: PropTypes) {
	const { data, isLoading } = useGetUserQuery({ company });

	return (
		<Card className="w-full">
			<CardContent className="pt-5">
				<ProfileCard loading={isLoading} data={data?.data} />
			</CardContent>
		</Card>
	);
}
