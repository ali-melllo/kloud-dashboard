import { createSlice } from '@reduxjs/toolkit';

import { resetAction } from '../../actions';

import { ConfigStateType } from './types/state';

const initialState: ConfigStateType = {
};

const configSlice = createSlice({
	name: 'config',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(resetAction, () => initialState);
	},
});

export default configSlice.reducer;
