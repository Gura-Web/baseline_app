import { Reducer } from 'redux';
import { MyActivityAction } from '../actions/myActivity/myActivity';
import * as ActionType from '../actions/myActivity/myActivityActionType';
import { User } from '../services/models';

export interface MyActivityState {
  visible: boolean;
  isLoading: boolean;
  user: User;
}

export const initialState: MyActivityState = {
  visible: false,
  isLoading: true,
  user: {
    id: 1,
    firstName: '＜＞',
    lastName: '＜＞',
    studentNumber: 1,
    yearOfGraduation: 1,
    iconImageUrl: 'a',
    sex: 1,
    email: '1',
    desiredOccupations: 1,
  },
};

export const myActivityReducer: Reducer<MyActivityState, MyActivityAction> = (
  state: MyActivityState = initialState,
  action: MyActivityAction,
) => {
  switch (action.type) {
    case ActionType.MY_ACTIVITY_WINDOW_OPEN:
      return {
        ...state,
        visible: true,
      };

    // アクティビティの取得処理
    case ActionType.GET_MY_ACTIVITY_START:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.GET_MY_ACTIVITY_SUCCEED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.GET_MY_ACTIVITY_FAILED:
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
