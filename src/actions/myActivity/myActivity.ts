import * as ActionType from './myActivityActionType';
import { User } from '../../services/models';
import { AxiosError } from 'axios';

interface GetMyActivityResult {
  user: User;
}

export interface GetMyActivityParams {
  id: number;
}

export const myActivity = {
  // 使われなくなる予定
  open: () => ({
    type: ActionType.MY_ACTIVITY_WINDOW_OPEN as typeof ActionType.MY_ACTIVITY_WINDOW_OPEN,
  }),

  start: (params: GetMyActivityParams) => ({
    type: ActionType.GET_MY_ACTIVITY_START as typeof ActionType.GET_MY_ACTIVITY_START,
    payload: { params },
  }),
  succeed: (params: GetMyActivityParams, result: GetMyActivityResult) => ({
    type: ActionType.GET_MY_ACTIVITY_SUCCEED as typeof ActionType.GET_MY_ACTIVITY_SUCCEED,
    payload: { params, result },
  }),
  failed: (params: GetMyActivityParams, error: AxiosError) => ({
    type: ActionType.GET_MY_ACTIVITY_FAILED as typeof ActionType.GET_MY_ACTIVITY_FAILED,
    payload: { params, error },
    error: true,
  }),
};

export type MyActivityAction =
  | ReturnType<typeof myActivity.open>
  | ReturnType<typeof myActivity.start>
  | ReturnType<typeof myActivity.succeed>
  | ReturnType<typeof myActivity.failed>;
