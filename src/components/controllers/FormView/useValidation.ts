import { useMemo } from 'react';

import { ValidationUtils } from '@/lib/Utils';

import { useTranslation } from '@/i18n';

import type { InputPropTypes } from './type';

export default function useInputValidation(input: InputPropTypes) {
	const { t } = useTranslation();

	const rulesWithMessage = useMemo(() => {
		const { rules } = input;
		if (!rules) return rules;

		let finalRules: {} = { ...rules };

		if (rules.required) {
			let message;
			if (rules.required.message !== undefined) {
				message = rules.required.message;
			}
			else {
				message = t('errors.field_is_required', { field: input.label });
			}
			finalRules = {
				...finalRules,
				required: {
					value: true,
					message,
				},
			};
		}

		if (input.type === 'email') {
			finalRules = {
				...finalRules,
				validate: (value: {}) => {
					if (!ValidationUtils.isValidEmail(value)) {
						return t('errors.email_is_not_valid');
					}
					return undefined;
				},
			};
		}

		return finalRules;
	}, [t, input]);

	return {
		rulesWithMessage,
	};
}
