/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

import { resetAction } from '../../actions';

import { UserRehydrateAction, UserStateType } from './types/state';

const initialState: UserStateType = {
	profile: {
		email: '',
		username: '',
		firstName: '',
		lastName: '',
		phoneNumber: '',
		emailVerified: false,
		phoneNumberVerified: false,
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
	},
	extraReducers: builder => {
		builder.addCase(resetAction, () => initialState);
		builder.addCase(REHYDRATE, (state, action: UserRehydrateAction) => {
			if (action.payload && action.payload.user) {
				const { ...rest } = action.payload.user;

				return {
					...state,
					...rest,
				};
			}
			return state;
		});
	},
});

export default userSlice.reducer;
