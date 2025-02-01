'use client';

import { toast } from 'sonner';

import { NotificationProvider } from '@refinedev/core';

export const notificationProvider: NotificationProvider = {
	open: ({
		message, type, key, description,
	}) => {
		if (type === 'error') {
			toast.error(message, { description, id: key });
		}
		else if (type === 'success') {
			toast.success(message, { description });
		}
	},
	close: key => {
		toast.dismiss(key);
	},
};
