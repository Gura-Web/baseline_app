import { Reducer } from 'redux';
import { MyActivityAction } from '../actions/myActivity/myActivity';
import * as ActionType from '../actions/myActivity/myActivityActionType';

export interface MyActivityState {
  visible: boolean;
}

export const initialState: MyActivityState = {
  visible: false,
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

    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-case-declarations
      // const _: never = action;

      return state;
  }
};
