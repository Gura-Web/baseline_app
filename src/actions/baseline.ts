import { AxiosError } from 'axios';
import * as ActionType from './myProfile';
import { User } from '../services/models';

interface GetMyProfileResult {
  user: User;
}

export const getMyProfile = {
  start: () => ({
    type: ActionType.GET_MY_PROFILE_START as typeof ActionType.GET_MY_PROFILE_START,
  }),

  succeed: (result: GetMyProfileResult) => ({
    type: ActionType.GET_MY_PROFILE_SUCCEED as typeof ActionType.GET_MY_PROFILE_SUCCEED,
    payload: { result },
  }),

  failed: (error: AxiosError) => ({
    type: ActionType.GET_MY_PROFILE_FAILED as typeof ActionType.GET_MY_PROFILE_FAILED,
    payload: { error },
    error: true,
  }),
};

export type MyProfileAction =
  | ReturnType<typeof getMyProfile.start>
  | ReturnType<typeof getMyProfile.succeed>
  | ReturnType<typeof getMyProfile.failed>;
