import { Reducer } from 'redux';
import { MyActivityAction } from '../actions/myActivity/myActivity';
import * as ActionType from '../actions/myActivity/myActivityActionType';
import { CompanyInformation, User, userInit } from '../services/models';

export interface MyActivityState {
  visible: boolean;
  isLoading: boolean;
  user: User;
  companyInformation?: CompanyInformation;
}

export const initialState: MyActivityState = {
  visible: false,
  isLoading: true,
  user: userInit,
};

export const myActivityReducer: Reducer<MyActivityState, MyActivityAction> = (
  state: MyActivityState = initialState,
  action: MyActivityAction,
) => {
  switch (action.type) {
    case ActionType.MY_ACTIVITY_POST_WINDOW_OPEN:
      return {
        ...state,
        visible: true,
      };
    case ActionType.MY_ACTIVITY_POST_WINDOW_CLOSE:
      return {
        ...state,
        visible: false,
      };

    case ActionType.MY_ACTIVITY_EDIT_WINDOW_OPEN:
      return {
        ...state,
        visible: true,
      };
    case ActionType.MY_ACTIVITY_EDIT_WINDOW_CLOSE:
      return {
        ...state,
        visible: false,
      };

    case ActionType.RELOAD_MY_ACTIVITY_START:
      return {
        ...state,
        isLoading: false,
      };

    // 取得処理
    case ActionType.GET_MY_ACTIVITY_START:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.GET_MY_ACTIVITY_SUCCEED:
      return {
        ...state,
        user: action.payload.result.user,
        isLoading: false,
      };
    case ActionType.GET_MY_ACTIVITY_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    // 投稿処理
    case ActionType.POST_MY_ACTIVITY_START:
      return {
        ...state,
      };
    case ActionType.POST_MY_ACTIVITY_SUCCEED:
      return {
        ...state,
      };
    case ActionType.POST_MY_ACTIVITY_FAILED:
      return {
        ...state,
      };

    // 個別取得＆編集
    case ActionType.SHOW_MY_ACTIVITY_START:
      return {
        ...state,
      };
    case ActionType.SHOW_MY_ACTIVITY_SUCCEED:
      return {
        ...state,
        companyInformation: action.payload.result.companyInformation,
      };
    case ActionType.SHOW_MY_ACTIVITY_FAILED:
      return {
        ...state,
      };
    case ActionType.EDIT_MY_ACTIVITY_START:
      return {
        ...state,
      };
    case ActionType.EDIT_MY_ACTIVITY_SUCCEED:
      return {
        ...state,
      };
    case ActionType.EDIT_MY_ACTIVITY_FAILED:
      return {
        ...state,
      };

    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-case-declarations
      const _: never = action;

      return state;
  }
};
