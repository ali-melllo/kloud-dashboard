import { ProfileType } from '@src/services/modules/user/types/type';
import { RehydrateAction } from 'redux-persist';

export type UserStateType = {
	profile: ProfileType;
}

export type UserRehydrateAction = RehydrateAction & {
	payload: { user: UserStateType } ;
};
