const LocaleUtils = {
	si_symbol: ['', 'k', 'M', 'G', 'T', 'P', 'E'],
	ltrMark: '‎',
	rtlMark: '‏',
	numbers: {
		en: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		fa: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
		ar: ['۰', '۱', '۲', '۳', '٤', '۵', '٦', '۷', '۸', '۹'],
	},

	weekDays: {
		en: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
		fa: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
	} as Record<string, string[]>,

	convertNumber(num: number | string, targetLng: string, options?: any) {
		let str = String(num);

		if (options && options.comma) {
			str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}

		if (targetLng === 'en') {
			str = str.replace(/[۰-۹]/g, d => `${this.numbers.fa.indexOf(d)}`);
		}
		else {
			// @ts-ignore
			str = str.replace(/\d/g, d => `${this.numbers[targetLng][d]}`);
		}

		return str;
	},

	hasPersianChars(str: string) {
		const pattern = /[\u0600-\u06FF]/g;

		if (pattern.test(str)) {
			return true;
		}

		return false;
	},
};

export default LocaleUtils;
