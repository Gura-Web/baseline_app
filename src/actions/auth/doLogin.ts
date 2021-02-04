import { AxiosError } from 'axios';
import * as ActionType from './login';

export interface LoginParams {
  email: string;
  password: string;
  active: '0' | '1';
}

export const doLogin = {
  init: () => ({
    type: ActionType.DO_LOGIN_INIT as typeof ActionType.DO_LOGIN_INIT,
  }),

  start: (params: LoginParams) => ({
    type: ActionType.DO_LOGIN_START as typeof ActionType.DO_LOGIN_START,
    payload: { params },
  }),

  succeed: (params: LoginParams) => ({
    type: ActionType.DO_LOGIN_SUCCEED as typeof ActionType.DO_LOGIN_SUCCEED,
    payload: { params },
  }),

  failed: (params: LoginParams, error: AxiosError) => ({
    type: ActionType.DO_LOGIN_FAILED as typeof ActionType.DO_LOGIN_FAILED,
    payload: { params, error },
    error: true,
  }),
};

export type LoginAction =
  | ReturnType<typeof doLogin.init>
  | ReturnType<typeof doLogin.start>
  | ReturnType<typeof doLogin.succeed>
  | ReturnType<typeof doLogin.failed>;
