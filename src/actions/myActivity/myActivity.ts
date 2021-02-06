import { AxiosError } from 'axios';
import * as ActionType from './myActivityActionType';
import { User } from '../../services/models';

interface GetMyActivityResult {
  user: User;
}

export interface GetMyActivityParams {
  id: number;
}

export const myActivity = {
  open: () => ({
    type: ActionType.MY_ACTIVITY_POST_WINDOW_OPEN as typeof ActionType.MY_ACTIVITY_POST_WINDOW_OPEN,
  }),
  close: () => ({
    type: ActionType.MY_ACTIVITY_POST_WINDOW_CLOSE as typeof ActionType.MY_ACTIVITY_POST_WINDOW_CLOSE,
  }),

  start: (params: GetMyActivityParams) => ({
    type: ActionType.GET_MY_ACTIVITY_START as typeof ActionType.GET_MY_ACTIVITY_START,
    payload: { params },
  }),
  succeed: (result: GetMyActivityResult) => ({
    type: ActionType.GET_MY_ACTIVITY_SUCCEED as typeof ActionType.GET_MY_ACTIVITY_SUCCEED,
    payload: { result },
  }),
  failed: (params: GetMyActivityParams, error: AxiosError) => ({
    type: ActionType.GET_MY_ACTIVITY_FAILED as typeof ActionType.GET_MY_ACTIVITY_FAILED,
    payload: { params, error },
    error: true,
  }),
};

export type MyActivityAction =
  | ReturnType<typeof myActivity.open>
  | ReturnType<typeof myActivity.close>
  | ReturnType<typeof myActivity.start>
  | ReturnType<typeof myActivity.succeed>
  | ReturnType<typeof myActivity.failed>;
