import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';

import api from '@/services/api';

import { persistedReducer } from './reducers';

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware => {
		const middleWares = getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(api.middleware);

		return middleWares;
	},
	// devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);
setupListeners(store.dispatch);

// if (module.hot) {
// 	module.hot.accept(() => {
// 		const nextRootReducer = require('./reducers').default;
// 		const nextReducer = persistReducer(persistConfig, nextRootReducer);
// 		store.replaceReducer(nextReducer);
// 	});
// }

export { persistor, store };
