/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { resetAction } from '../../actions';

import { AuthStateType } from './types/state';

const initialState: AuthStateType = {
	tokens: {
		access: '',
		refresh: '',
	},
	loginCompleted: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		completeLogin: state => {
			state.loginCompleted = true;
		},
		updateTokens: (state, { payload }) => {
			state.tokens = payload.tokens;
		},
		logout: () => initialState,
	},
	extraReducers: builder => {
		builder.addCase(resetAction, () => initialState);
	},
});

export default authSlice.reducer;
export const { completeLogin, updateTokens, logout } = authSlice.actions;
