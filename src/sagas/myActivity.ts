import * as Action from '../actions/myActivity/myActivityActionType';
import { myActivity } from '../actions/myActivity/myActivity';
import { fork, takeLatest, put, call } from 'redux-saga/effects';
import { getMyActivityFactory } from '../services/myActivity';
import { getMyProfile } from '../actions/baseline';

function* openMyActivityWindow(action: ReturnType<typeof myActivity.open>) {}

export function* runGetMyActivity(action: ReturnType<typeof myActivity.start>) {
  const { params } = action.payload;

  try {
    const api = getMyActivityFactory(params.id);
    const response = yield call(api);

    yield put(getMyProfile.succeed(response.user));
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
