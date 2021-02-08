import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { myActivity } from '../actions/myActivity/myActivity';
import * as Action from '../actions/myActivity/myActivityActionType';
import { getMyActivityFactory } from '../services/myActivity';

export function* runGetMyActivity(
  action: ReturnType<typeof myActivity.getStart>,
) {
  const { params } = action.payload;

  try {
    const api = getMyActivityFactory(params.id);
    const user = yield call(api);

    yield put(myActivity.getSucceed({ user }));
  } catch (error) {
    yield put(myActivity.getFailed(params, error));
  }
}

export function* watchRunGetMyActivity() {
  yield takeLatest(Action.GET_MY_ACTIVITY_START, runGetMyActivity);
}

export default [fork(watchRunGetMyActivity)];
