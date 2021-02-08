import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { myActivity } from '../actions/myActivity/myActivity';
import * as Action from '../actions/myActivity/myActivityActionType';
import {
  getMyActivityFactory,
  postMyActivityFactory,
} from '../services/myActivity';

export function* runGetMyActivity(
  action: ReturnType<typeof myActivity.getStart>,
) {
  const { params } = action.payload;

  try {
    const api = getMyActivityFactory(params.userId);
    const user = yield call(api);

    yield put(myActivity.getSucceed({ user }));
  } catch (error) {
    yield put(myActivity.getFailed(params, error));
  }
}

// リロード処理
export function* runReloadMyActivity(
  action: ReturnType<typeof myActivity.reload>,
) {
  const { params } = action.payload;

  const api = getMyActivityFactory(params.userId);
  const user = yield call(api);

  yield put(myActivity.getSucceed({ user }));
}

// 投稿処理
export function* runPostMyActivity(
  action: ReturnType<typeof myActivity.postStart>,
) {
  const { params } = action.payload;

  try {
    const api = postMyActivityFactory(params.content);
    yield call(api);

    yield put(myActivity.postSucceed());

    // リロード処理
    yield put(myActivity.reload(params));
  } catch (error) {
    yield put(myActivity.postFailed(error));
  }
}

export function* watchRunGetMyActivity() {
  yield takeLatest(Action.GET_MY_ACTIVITY_START, runGetMyActivity);
}

export function* watchRunPostMyActivity() {
  yield takeLatest(Action.POST_MY_ACTIVITY_START, runPostMyActivity);
}

export function* watchRunReloadMyActivity() {
  yield takeLatest(Action.RELOAD_MY_ACTIVITY_START, runReloadMyActivity);
}

export default [
  fork(watchRunGetMyActivity),
  fork(watchRunPostMyActivity),
  fork(watchRunReloadMyActivity),
];
