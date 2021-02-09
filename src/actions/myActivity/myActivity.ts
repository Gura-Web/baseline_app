import { AxiosError } from 'axios';
import * as ActionType from './myActivityActionType';
import { CompanyInformation, User } from '../../services/models';

interface GetMyActivityResult {
  user: User;
}

interface ShowMyActivityResult {
  companyInformation: CompanyInformation;
}

export interface ShowMyActivityParams {
  id: number;
}

export interface EditMyActivityParams {
  userId: number;
  id: number;
  content: string;
}

export interface GetMyActivityParams {
  userId?: number;
}

export interface PostMyActivityParams {
  userId: number;
  content: string;
}

export const myActivity = {
  postWindowOpen: () => ({
    type: ActionType.MY_ACTIVITY_POST_WINDOW_OPEN as typeof ActionType.MY_ACTIVITY_POST_WINDOW_OPEN,
  }),
  postWindowClose: () => ({
    type: ActionType.MY_ACTIVITY_POST_WINDOW_CLOSE as typeof ActionType.MY_ACTIVITY_POST_WINDOW_CLOSE,
  }),

  reload: (params: GetMyActivityParams) => ({
    type: ActionType.RELOAD_MY_ACTIVITY_START as typeof ActionType.RELOAD_MY_ACTIVITY_START,
    payload: { params },
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

  postStart: (params: PostMyActivityParams) => ({
    type: ActionType.POST_MY_ACTIVITY_START as typeof ActionType.POST_MY_ACTIVITY_START,
    payload: { params },
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

  showStart: (params: ShowMyActivityParams) => ({
    type: ActionType.SHOW_MY_ACTIVITY_START as typeof ActionType.SHOW_MY_ACTIVITY_START,
    payload: { params },
  }),
  showSucceed: (result: ShowMyActivityResult) => ({
    type: ActionType.SHOW_MY_ACTIVITY_SUCCEED as typeof ActionType.SHOW_MY_ACTIVITY_SUCCEED,
    payload: { result },
  }),
  showFailed: (error: AxiosError) => ({
    type: ActionType.SHOW_MY_ACTIVITY_FAILED as typeof ActionType.SHOW_MY_ACTIVITY_FAILED,
    payload: { error },
    error: true,
  }),

  editStart: (params: EditMyActivityParams) => ({
    type: ActionType.EDIT_MY_ACTIVITY_START as typeof ActionType.EDIT_MY_ACTIVITY_START,
    payload: { params },
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
  | ReturnType<typeof myActivity.reload>
  | ReturnType<typeof myActivity.postWindowOpen>
  | ReturnType<typeof myActivity.postWindowClose>
  | ReturnType<typeof myActivity.getStart>
  | ReturnType<typeof myActivity.getSucceed>
  | ReturnType<typeof myActivity.getFailed>
  | ReturnType<typeof myActivity.postStart>
  | ReturnType<typeof myActivity.postSucceed>
  | ReturnType<typeof myActivity.postFailed>
  | ReturnType<typeof myActivity.showStart>
  | ReturnType<typeof myActivity.showSucceed>
  | ReturnType<typeof myActivity.showFailed>
  | ReturnType<typeof myActivity.editStart>
  | ReturnType<typeof myActivity.editSucceed>
  | ReturnType<typeof myActivity.editFailed>;
