import { AxiosError } from 'axios';
import * as ActionType from './login';

export const doLogin = {
  start: () => ({
    type: ActionType.DO_LOGIN_START as typeof ActionType.DO_LOGIN_START,
  }),

  succeed: () => ({
    type: ActionType.DO_LOGIN_SUCCEED as typeof ActionType.DO_LOGIN_SUCCEED,
  }),

  failed: (error: AxiosError) => ({
    type: ActionType.DO_LOGIN_FAILED as typeof ActionType.DO_LOGIN_FAILED,
    payload: { error },
    error: true,
  }),
};

export type LoginAction =
  | ReturnType<typeof doLogin.start>
  | ReturnType<typeof doLogin.succeed>
  | ReturnType<typeof doLogin.failed>;
