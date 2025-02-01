const TextUtils = {
	/*
		Limit characters, placing a ... at the end
	*/
	limitChars: (str: string, limit = 20, removeBreak = false, addDots = true) => {
		let finalStr = str;

		if (!finalStr) {
			return '';
		}
		if (str.length > limit) {
			finalStr = finalStr.substring(0, limit).trim();
			if (addDots) {
				finalStr = `${finalStr} ...`;
			}
		}
		if (removeBreak) {
			finalStr = finalStr.replace(/(\r\n|\n|\r)/gm, ' ');
		}
		return finalStr;
	},

	toCamelCase: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),

	toLowerFirstLetter: (str: string) => {
		return str.charAt(0).toLowerCase() + str.slice(1);
	},

	// Use a regular expression to remove punctuation marks
	removePunctuation: (text: string) => {
		return text.replace(/[.,/#!$%^&*;:{}=\-_`~()'"?¿!¡+]/g, '');
	},

	// Use regex to split the text into words while preserving punctuations
	splitTextByWords: (text: string) => {
		return text.split(/(\b|\s)/).filter(word => word !== '');
	},

};

export default TextUtils;
