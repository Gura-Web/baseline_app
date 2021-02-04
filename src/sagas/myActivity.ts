import * as Action from '../actions/myActivity/myActivityActionType';
import { myActivity } from '../actions/myActivity/myActivity';
import { fork, takeLatest } from 'redux-saga/effects';

function* openMyActivityWindow(action: ReturnType<typeof myActivity.open>) {}

export function* watchOpenMyActivityWindow() {
  yield takeLatest(Action.MY_ACTIVITY_WINDOW_OPEN, openMyActivityWindow);
}

export default [fork(watchOpenMyActivityWindow)];
