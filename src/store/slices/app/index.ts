/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

import { AppRehydrateAction, AppStateType } from './types/state';

const initialState: AppStateType = {
	application: {},
	uploadFileMeta: {
		meta: '',
		container: '',
		fileNamePath: '',
	},
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setApplicationData: (state, { payload }) => {
			state.application = payload.application;
		},
		setUploadFileMeta: (state, { payload }) => {
			state.uploadFileMeta = payload.uploadFileMeta;
		},
	},
	extraReducers: builder => {
		builder.addCase(REHYDRATE, (state, action: AppRehydrateAction) => {
			if (action.payload && action.payload.app) {
				const { ...rest } = action.payload.app;

				return {
					...state,
					...rest,
				};
			}

			return state;
		});
	},
});

export default appSlice.reducer;
export const { setApplicationData, setUploadFileMeta } = appSlice.actions;
