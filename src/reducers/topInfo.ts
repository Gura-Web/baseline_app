import { Reducer } from 'redux';
import { TopInfoAction } from '../actions/usecase/Top/top';
import { TopInfo } from '../services/models';
import * as ActionType from '../actions/usecase/Top/actions';

export interface TopInfoState {
  topInfo: TopInfo;
  isLoading: boolean;
}

export const initialState: TopInfoState = {
  topInfo: { companies: [], myActivities: null, otherActivities: null },
  isLoading: true,
};

export const topInfoReducer: Reducer<TopInfoState, TopInfoAction> = (
  state: TopInfoState = initialState,
  action: TopInfoAction,
) => {
  switch (action.type) {
    case ActionType.GET_TOP_INFO_RELOAD:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.GET_TOP_INFO_START:
      return {
        ...state,
      };
    case ActionType.GET_TOP_INFO_SUCCEED:
      return {
        ...state,
        topInfo: action.payload.result.topInfo,
        isLoading: false,
      };

    case ActionType.GET_TOP_INFO_FAILED:
      return {
        ...state,
        isError: true,
      };

    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-case-declarations
      const _: never = action;

      return state;
  }
};
