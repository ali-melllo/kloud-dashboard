const CommonUtils = {
	compareVersion(v1: string, v2: string) {
		const v1parts = v1.split('.').map(Number);
		const v2parts = v2.split('.').map(Number);

		const isValidPart = (x: number) => (/^\d+$/).test(`${x}`);

		if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
			return NaN;
		}

		for (let i = 0; i < v1parts.length; i += 1) {
			if (v2parts.length === i) {
				// v1 > v2
				return 1;
			}

			if (v1parts[i] === v2parts[i]) {
				// eslint-disable-next-line no-continue
				continue;
			}
			else if (v1parts[i] > v2parts[i]) {
				// v1 > v2
				return 1;
			}
			else {
				// v1 < v2
				return -1;
			}
		}

		if (v1parts.length !== v2parts.length) {
			// v1 < v2
			return -1;
		}

		// v1 == v2
		return 0;
	},

	handleError(error: any) {
		const { data, status } = error;

		let message: string = '';
		let extra: {} = {};
		let icon: string = '';
		let statusCode;
		let useTranslation = false;

		if (typeof error === 'string') {
			message = error;
		}

		if (data) {
			if (data === 'Network request failed') {
				icon = 'wifi';
				message = 'errors.try_again_on_network_error';
				useTranslation = true;
			}
			else if (typeof data === 'string') {
				message = data;
			}
			if (data?.message) {
				message = data.message;
			}

			if (data?.errorCode) {
				statusCode = data.errorCode;
			}

			if (data.extra) {
				if (data.extra.fields) {
					if (Array.isArray(data.extra.fields)) {
						[message] = data.extra.fields;
					}
					else {
						const keys = Object.keys(data.extra.fields);
						if (keys.length) {
							const candidateField = keys[0];
							const value = data.extra.fields[candidateField];
							extra = { formField: candidateField };
							if (Array.isArray(value)) {
								[message] = value;
							}
							else {
								message = value;
							}
						}
					}
				}
				else {
					extra = data.extra;
				}
			}
		}

		if (!message) {
			message = 'errors.unknown';
			useTranslation = true;
		}
		if (!statusCode) statusCode = status;

		return {
			message,
			status: statusCode,
			icon,
			extra: { ...extra, useTranslation },
		};
	},

	shuffleArray(arr: any[]) {
		const newArray = [...arr];

		for (let i = newArray.length - 1; i > 0; i -= 1) {
			const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
			// Swap the elements at i and j
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}
		return newArray;
	},

	arraysAreEqual(arr1: any[], arr2: any[]) {
		// Check if the arrays have the same length
		if (arr1.length !== arr2.length) {
			return false;
		}

		// Iterate through the arrays and compare elements
		for (let i = 0; i < arr1.length; i += 1) {
			if (arr1[i] !== arr2[i]) {
				return false;
			}
		}

		return true;
	},

	generateUId() {
		return Date.now().toString();
	},
};

export default CommonUtils;
