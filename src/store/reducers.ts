import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/es/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import api from '@/services/api';

import appReducer from './slices/app';
import authReducer from './slices/auth';
import configReducer from './slices/config';
import userReducer from './slices/user';
// import { persistStorage } from './storage/mmkvStorage';

const persistConfig = {
	key: 'root',
	version: 1,
	storage: localStorage,
	blacklist: [api.reducerPath],
	stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
	config: configReducer,
	app: appReducer,
	user: userReducer,
	auth: authReducer,
	[api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

export { persistedReducer, rootReducer };
