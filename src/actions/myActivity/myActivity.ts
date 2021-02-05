import * as ActionType from './myActivityActionType';

export const myActivity = {
  // 使われなくなる予定
  open: () => ({
    type: ActionType.MY_ACTIVITY_WINDOW_OPEN as typeof ActionType.MY_ACTIVITY_WINDOW_OPEN,
  }),
};

export type MyActivityAction = ReturnType<typeof myActivity.open>;
