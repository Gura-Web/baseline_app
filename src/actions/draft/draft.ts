import { AxiosError } from 'axios';
import { Draft, User } from '../../services/models';
import * as ActionType from './actions';

interface GetDraftResult {
  drafts: Draft[];
}

export interface RegistDraftParams {
  contents: string;
}

export interface DeleteDraftParams {
  id: number;
}

export const draft = {
  getStart: () => ({
    type: ActionType.GET_DRAFT_START as typeof ActionType.GET_DRAFT_START,
    payload: {},
  }),
  getSucceed: (result: GetDraftResult) => ({
    type: ActionType.GET_DRAFT_SUCCEED as typeof ActionType.GET_DRAFT_SUCCEED,
    payload: { result },
  }),
  getFailed: (error: AxiosError) => ({
    type: ActionType.GET_DRAFT_FAILED as typeof ActionType.GET_DRAFT_FAILED,
    payload: { error },
    error: true,
  }),
  registStart: (params: RegistDraftParams) => ({
    type: ActionType.REGIST_DRAFT_START as typeof ActionType.REGIST_DRAFT_START,
    payload: { params },
  }),
  registSucceed: () => ({
    type: ActionType.REGIST_DRAFT_SUCCEED as typeof ActionType.REGIST_DRAFT_SUCCEED,
    payload: {},
  }),
  registFailed: (error: AxiosError) => ({
    type: ActionType.REGIST_DRAFT_FAILED as typeof ActionType.REGIST_DRAFT_FAILED,
    payload: { error },
    error: true,
  }),
  deleteStart: (params: DeleteDraftParams) => ({
    type: ActionType.DELETE_DRAFT_START as typeof ActionType.DELETE_DRAFT_START,
    payload: { params },
  }),
  deleteSucceed: () => ({
    type: ActionType.DELETE_DRAFT_SUCCEED as typeof ActionType.DELETE_DRAFT_SUCCEED,
    payload: {},
  }),
  deleteFailed: (error: AxiosError) => ({
    type: ActionType.DELETE_DRAFT_FAILED as typeof ActionType.DELETE_DRAFT_FAILED,
    payload: { error },
    error: true,
  }),
};

export type DraftAction =
  | ReturnType<typeof draft.getStart>
  | ReturnType<typeof draft.getSucceed>
  | ReturnType<typeof draft.getFailed>
  | ReturnType<typeof draft.registStart>
  | ReturnType<typeof draft.registSucceed>
  | ReturnType<typeof draft.registFailed>
  | ReturnType<typeof draft.deleteStart>
  | ReturnType<typeof draft.deleteSucceed>
  | ReturnType<typeof draft.deleteFailed>;
