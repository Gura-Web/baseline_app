import * as ActionType from './myActivityActionType';

// 使われなくなる予定

export const myActivity = {
  open: () => ({
    type: ActionType.MY_ACTIVITY_WINDOW_OPEN as typeof ActionType.MY_ACTIVITY_WINDOW_OPEN,
  }),
};

export type MyActivityAction = ReturnType<typeof myActivity.open>;
