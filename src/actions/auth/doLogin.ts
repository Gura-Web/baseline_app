import { AxiosError } from 'axios';
import * as ActionType from './auth';

export interface LoginParams {
  email: string;
  password: string;
  active: '0' | '1';
}

export const doLogin = {
  init: () => ({
    type: ActionType.DO_LOGIN_INIT as typeof ActionType.DO_LOGIN_INIT,
  }),

  loginStart: (params: LoginParams) => ({
    type: ActionType.DO_LOGIN_START as typeof ActionType.DO_LOGIN_START,
    payload: { params },
  }),

  loginSucceed: (params: LoginParams) => ({
    type: ActionType.DO_LOGIN_SUCCEED as typeof ActionType.DO_LOGIN_SUCCEED,
    payload: { params },
  }),

  loginFailed: (params: LoginParams, error: AxiosError) => ({
    type: ActionType.DO_LOGIN_FAILED as typeof ActionType.DO_LOGIN_FAILED,
    payload: { params, error },
    error: true,
  }),

  logoutStart: () => ({
    type: ActionType.DO_LOGOUT_START as typeof ActionType.DO_LOGOUT_START,
    payload: {},
  }),

  logoutSucceed: () => ({
    type: ActionType.DO_LOGOUT_SUCCEED as typeof ActionType.DO_LOGOUT_SUCCEED,
    payload: {},
  }),

  logoutFailed: (error: AxiosError) => ({
    type: ActionType.DO_LOGOUT_FAILED as typeof ActionType.DO_LOGOUT_FAILED,
    payload: { error },
    error: true,
  }),
};

export type LoginAction =
  | ReturnType<typeof doLogin.init>
  | ReturnType<typeof doLogin.loginStart>
  | ReturnType<typeof doLogin.loginSucceed>
  | ReturnType<typeof doLogin.loginFailed>
  | ReturnType<typeof doLogin.logoutStart>
  | ReturnType<typeof doLogin.logoutSucceed>
  | ReturnType<typeof doLogin.logoutFailed>;
