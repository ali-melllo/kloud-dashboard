'use client';

import type { PropsWithChildren } from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { persistor, store } from './index';

type PropTypes = PropsWithChildren;

function ReduxProvider({ children }: PropTypes) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}

export default ReduxProvider;
