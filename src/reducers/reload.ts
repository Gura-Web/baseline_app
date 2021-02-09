import { Reducer } from 'redux';
import { ReloadAction } from '../actions/reload/reload';
import * as Action from '../actions/reload/actions';

export interface ReloadState {
  reloadHandler: Array<() => void>;
  isLoading: boolean;
}

export const initialState: ReloadState = {
  reloadHandler: [],
  isLoading: false,
};

export const reloadReducer: Reducer<ReloadState, ReloadAction> = (
  state: ReloadState = initialState,
  action: ReloadAction,
) => {
  switch (action.type) {
    case Action.SET_RELOAD:
      return {
        ...state,
        reloadHandler: action.payload.params.reloadHandler,
      };
    case Action.RELOAD_START:
      return {
        ...state,
        isLoading: true,
      };
    case Action.RELOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case Action.RELOAD_FAILED:
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
