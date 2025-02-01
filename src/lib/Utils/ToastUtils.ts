import { toast } from './hooks/use-toast';

export const showToast = ({
	title,
	description,
	variant,
}: {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}) => {
	toast({
		title,
		description,
		variant,
	});
};
