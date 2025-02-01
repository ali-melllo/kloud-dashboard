const noopStorage = {
	setItem: () => {
		return Promise.resolve();
	},
	getItem: () => {
		return Promise.resolve(null);
	},
	removeItem: () => {
		return Promise.resolve();
	},
};

export default noopStorage;
