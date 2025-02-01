const ValidationUtils = {

	isNumber(str: any) {
		return !Number.isNaN(Number(str));
	},

	isEmail(str: string) {
		return str.includes('@');
	},

	/*
		validate Email
		pooria.barghi@gmail.com
	*/
	isValidEmail(email: string) {
		return 	/^[a-z0-9\u007F-\uffff!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,6}$/i.test(email);
	},

	/*
		validate phone number
		09369286019
		0(1 times) + 9(1 times) + 0-9(1 times) + 0-9(1 times) + 0-9(7 times)
	*/
	isValidPhoneNumber(phoneNumber: string) {
		return /^[0][9][0-9]{9}$/g.test(phoneNumber);
	},

	/*
		Validate Password
	*/
	isValidPassword(password: string) {
		if (password.length < 6) {
			return 'auth.password_min_length_constraint';
		}
		// if (password.length > 20) {
		// 	return 'auth.password_max_length_constraint';
		// }
		// if (password.search(/[a-zA-Z]/) === -1) {
		// 	return 'auth.password_one_letter_constraint';
		// }
		// if (password.search(/\d/) === -1) {
		// 	return 'auth.password_one_number_constraint';
		// }

		return false;
	},

	normalizePhoneNumber: (phoneNumber: string, prefix?: string) => {
		let pn = phoneNumber.replace('+', '').replace(/\s/g, '');

		if (pn.startsWith('9') && pn.length === 10) { // 9369286019 -> +98 9369286019
			pn = `${pn}`;
		}
		else if (pn.startsWith('09') && pn.length === 11) { // 09369286019 -> +98 9369286019
			pn = `${pn.substring(1)}`;
		}
		else if (pn.startsWith('98') && pn.length === 12) { // 989369286019 -> +98 9369286019
			pn = `${pn.substring(2)}`;
		}
		else if (pn.startsWith('0098') && pn.length === 14) { // 00989369286019 -> +98 9369286019
			pn = `${pn.substring(4)}`;
		}
		else if (pn.startsWith('00980') && pn.length === 15) { // 009809369286019-> +98 9369286019
			pn = `${pn.substring(5)}`;
		}

		if (prefix) {
			pn = `${prefix}${pn}`;
		}

		return pn;
	},
};

export default ValidationUtils;
