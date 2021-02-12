import { Reducer } from 'redux';
import { MyProfileAction } from '../actions/baseline';
import * as ActionType from '../actions/myProfile';
import { User, userInit } from '../services/models';

export interface MyProfileState {
  user: User;
  isLoading: boolean;
  isError: boolean;
}

export const initialState: MyProfileState = {
  user: userInit,
  isLoading: true,
  isError: false,
};

export const myProfileReducer: Reducer<MyProfileState, MyProfileAction> = (
  state: MyProfileState = initialState,
  action: MyProfileAction,
) => {
  switch (action.type) {
    case ActionType.GET_MY_PROFILE_START:
      return {
        ...state,
        isError: false,
      };
    case ActionType.GET_MY_PROFILE_SUCCEED:
      return {
        ...state,
        user: action.payload.result.user,
        isLoading: false,
      };

    case ActionType.GET_MY_PROFILE_FAILED:
      return {
        ...state,
        isError: true,
      };

    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-case-declarations
      const _: never = action;

      return state;
  }
};
