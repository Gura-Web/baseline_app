import { Reducer } from 'redux';
import { DraftAction } from '../actions/draft/draft';
import * as ActionType from '../actions/draft/actions';
import { Draft } from '../services/models';

export interface DraftState {
  isLoading: boolean;
  drafts: Draft[];
}

export const initialState: DraftState = {
  isLoading: true,
  drafts: [],
};

export const draftReducer: Reducer<DraftState, DraftAction> = (
  state: DraftState = initialState,
  action: DraftAction,
) => {
  console.log('アクションタイプ');
  console.log(action.type);
  switch (action.type) {
    case ActionType.GET_DRAFT_START:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.GET_DRAFT_SUCCEED:
      return {
        ...state,
        drafts: action.payload.result.drafts,
        isLoading: false,
      };
    case ActionType.GET_DRAFT_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.REGIST_DRAFT_START:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.REGIST_DRAFT_SUCCEED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.REGIST_DRAFT_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.DELETE_DRAFT_START:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.DELETE_DRAFT_SUCCEED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.DELETE_DRAFT_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-case-declarations
      const _: never = action;

      return state;
  }
};
