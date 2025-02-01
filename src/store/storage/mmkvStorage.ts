import { Platform } from 'react-native';
import { MMKV } from 'react-native-mmkv';

const mmkvStorage = new MMKV();

if (__DEV__ && !process.env.JEST_WORKER_ID && Platform.OS === 'android') {
	// eslint-disable-next-line global-require
	const { initializeMMKVFlipper } = require('react-native-mmkv-flipper-plugin');
	initializeMMKVFlipper({ default: mmkvStorage });
}

export const persistStorage = {
	setItem: (key: string, value: boolean | string | number | Uint8Array) => {
		mmkvStorage.set(key, value);
		return Promise.resolve(true);
	},
	getItem: (key: string) => {
		const value = mmkvStorage.getString(key);
		return Promise.resolve(value);
	},
	removeItem: (key: string) => {
		mmkvStorage.delete(key);
		return Promise.resolve();
	},
};

export default mmkvStorage;
