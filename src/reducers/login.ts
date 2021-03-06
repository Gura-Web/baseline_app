import { Reducer } from 'redux';
import * as ActionType from '../actions/auth/auth';
import { LoginAction } from '../actions/auth/doLogin';

export interface LoginState {
  isError: boolean;
  isSuccess: boolean;
}

export const initialLoginState: LoginState = {
  isError: false,
  isSuccess: false,
};

export const loginReducer: Reducer<LoginState, LoginAction> = (
  state: LoginState = initialLoginState,
  action: LoginAction,
) => {
  switch (action.type) {
    case ActionType.DO_LOGIN_INIT:
      return {
        ...state,
        isSuccess: false,
      };

    case ActionType.DO_LOGIN_START:
      return {
        ...state,
        isError: false,
      };
    case ActionType.DO_LOGIN_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };

    case ActionType.DO_LOGIN_FAILED:
      return {
        ...state,
        isError: true,
      };

    case ActionType.DO_LOGOUT_START:
      return {
        ...state,
      };
    case ActionType.DO_LOGOUT_SUCCEED:
      return {
        ...state,
      };

    case ActionType.DO_LOGOUT_FAILED:
      return {
        ...state,
      };

    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-case-declarations
      const _: never = action;

      return state;
  }
};
