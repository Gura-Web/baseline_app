import * as Action from '../actions/myActivity/myActivityActionType';
import { myActivity } from '../actions/myActivity/myActivity';
import { fork, takeLatest, put, call } from 'redux-saga/effects';
import { getMyActivityFactory } from '../services/myActivity';

function* openMyActivityWindow(action: ReturnType<typeof myActivity.open>) {}

export function* runGetMyActivity(action: ReturnType<typeof myActivity.start>) {
  const { params } = action.payload;

  try {
    const api = getMyActivityFactory(params.id);
    const user = yield call(api);

    yield put(myActivity.succeed({ user }));
  } catch (error) {
    yield put(myActivity.failed(params, error));
  }
}

export function* watchRunGetMyActivity() {
  yield takeLatest(Action.GET_MY_ACTIVITY_START, runGetMyActivity);
}

export function* watchOpenMyActivityWindow() {
  yield takeLatest(Action.MY_ACTIVITY_WINDOW_OPEN, openMyActivityWindow);
}

export default [fork(watchOpenMyActivityWindow), fork(watchRunGetMyActivity)];
