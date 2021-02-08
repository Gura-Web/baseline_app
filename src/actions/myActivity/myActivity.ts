import { AxiosError } from 'axios';
import * as ActionType from './myActivityActionType';
import { User } from '../../services/models';

interface GetMyActivityResult {
  user: User;
}

export interface GetMyActivityParams {
  id?: number;
}

export const myActivity = {
  open: () => ({
    type: ActionType.MY_ACTIVITY_POST_WINDOW_OPEN as typeof ActionType.MY_ACTIVITY_POST_WINDOW_OPEN,
  }),
  close: () => ({
    type: ActionType.MY_ACTIVITY_POST_WINDOW_CLOSE as typeof ActionType.MY_ACTIVITY_POST_WINDOW_CLOSE,
  }),

  getStart: (params: GetMyActivityParams) => ({
    type: ActionType.GET_MY_ACTIVITY_START as typeof ActionType.GET_MY_ACTIVITY_START,
    payload: { params },
  }),
  getSucceed: (result: GetMyActivityResult) => ({
    type: ActionType.GET_MY_ACTIVITY_SUCCEED as typeof ActionType.GET_MY_ACTIVITY_SUCCEED,
    payload: { result },
  }),
  getFailed: (params: GetMyActivityParams, error: AxiosError) => ({
    type: ActionType.GET_MY_ACTIVITY_FAILED as typeof ActionType.GET_MY_ACTIVITY_FAILED,
    payload: { params, error },
    error: true,
  }),

  showStart: () => ({
    type: ActionType.SHOW_MY_ACTIVITY_START as typeof ActionType.SHOW_MY_ACTIVITY_START,
    payload: {},
  }),
  showSucceed: () => ({
    type: ActionType.SHOW_MY_ACTIVITY_SUCCEED as typeof ActionType.SHOW_MY_ACTIVITY_SUCCEED,
    payload: {},
  }),
  showFailed: (error: AxiosError) => ({
    type: ActionType.SHOW_MY_ACTIVITY_FAILED as typeof ActionType.SHOW_MY_ACTIVITY_FAILED,
    payload: { error },
    error: true,
  }),

  postStart: () => ({
    type: ActionType.POST_MY_ACTIVITY_START as typeof ActionType.POST_MY_ACTIVITY_START,
    payload: {},
  }),
  postSucceed: () => ({
    type: ActionType.POST_MY_ACTIVITY_SUCCEED as typeof ActionType.POST_MY_ACTIVITY_SUCCEED,
    payload: {},
  }),
  postFailed: (error: AxiosError) => ({
    type: ActionType.POST_MY_ACTIVITY_FAILED as typeof ActionType.POST_MY_ACTIVITY_FAILED,
    payload: { error },
    error: true,
  }),

  editStart: () => ({
    type: ActionType.EDIT_MY_ACTIVITY_START as typeof ActionType.EDIT_MY_ACTIVITY_START,
    payload: {},
  }),
  editSucceed: () => ({
    type: ActionType.EDIT_MY_ACTIVITY_SUCCEED as typeof ActionType.EDIT_MY_ACTIVITY_SUCCEED,
    payload: {},
  }),
  editFailed: (error: AxiosError) => ({
    type: ActionType.EDIT_MY_ACTIVITY_FAILED as typeof ActionType.EDIT_MY_ACTIVITY_FAILED,
    payload: { error },
    error: true,
  }),

  deleteStart: () => ({
    type: ActionType.DELETE_MY_ACTIVITY_START as typeof ActionType.DELETE_MY_ACTIVITY_START,
    payload: {},
  }),
  deleteSucceed: () => ({
    type: ActionType.DELETE_MY_ACTIVITY_SUCCEED as typeof ActionType.DELETE_MY_ACTIVITY_SUCCEED,
    payload: {},
  }),
  deleteFailed: (error: AxiosError) => ({
    type: ActionType.DELETE_MY_ACTIVITY_FAILED as typeof ActionType.DELETE_MY_ACTIVITY_FAILED,
    payload: { error },
    error: true,
  }),
};

export type MyActivityAction =
  | ReturnType<typeof myActivity.open>
  | ReturnType<typeof myActivity.close>
  | ReturnType<typeof myActivity.getStart>
  | ReturnType<typeof myActivity.getSucceed>
  | ReturnType<typeof myActivity.getFailed>;
