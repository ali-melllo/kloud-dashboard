import { persistedReducer } from './reducers';
import { store } from '.';

export type AppState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof persistedReducer>;
export type AppDispatch = typeof store.dispatch;

declare module 'react-redux' {
	export type DefaultRootState = RootState;
}
