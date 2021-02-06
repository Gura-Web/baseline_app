import { AxiosError } from 'axios';
import { Draft, User } from '../../services/models';
import * as ActionType from './actions';

interface GetDraftResult {
  drafts: Draft[];
}

export const draft = {
  start: () => ({
    type: ActionType.GET_DRAFT_START as typeof ActionType.GET_DRAFT_START,
    payload: {},
  }),
  succeed: (result: GetDraftResult) => ({
    type: ActionType.GET_DRAFT_SUCCEED as typeof ActionType.GET_DRAFT_SUCCEED,
    payload: { result },
  }),
  failed: (error: AxiosError) => ({
    type: ActionType.GET_DRAFT_FAILED as typeof ActionType.GET_DRAFT_FAILED,
    payload: { error },
    error: true,
  }),
};

export type DraftAction =
  | ReturnType<typeof draft.start>
  | ReturnType<typeof draft.succeed>
  | ReturnType<typeof draft.failed>;
