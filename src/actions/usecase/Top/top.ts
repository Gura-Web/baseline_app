import { AxiosError } from 'axios';
import * as ActionType from './actions';

interface GetTopInfoResult {}

export const topInfo = {
  reload: () => ({
    type: ActionType.GET_TOP_INFO_RELOAD as typeof ActionType.GET_TOP_INFO_RELOAD,
  }),
  getStart: () => ({
    type: ActionType.GET_TOP_INFO_START as typeof ActionType.GET_TOP_INFO_START,
  }),
  getSucceed: (result: GetTopInfoResult) => ({
    type: ActionType.GET_TOP_INFO_SUCCEED as typeof ActionType.GET_TOP_INFO_SUCCEED,
    payload: { result },
  }),
  getFailed: (error: AxiosError) => ({
    type: ActionType.GET_TOP_INFO_FAILED as typeof ActionType.GET_TOP_INFO_FAILED,
    payload: { error },
    error: true,
  }),
};

export type TopInfoAction =
  | ReturnType<typeof topInfo.reload>
  | ReturnType<typeof topInfo.getStart>
  | ReturnType<typeof topInfo.getSucceed>
  | ReturnType<typeof topInfo.getFailed>;
