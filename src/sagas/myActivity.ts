import * as Action from '../actions/myActivity/myActivityActionType';
import * as ModalAction from '../actions/modal/actions';

import { myActivity } from '../actions/myActivity/myActivity';
import { fork, takeLatest, put, call } from 'redux-saga/effects';
import { getMyActivityFactory } from '../services/myActivity';
import { openModal, watchOpenModal } from './modal';
import { modal } from '../actions/modal/modal';

export function* openMyActivityWindow(
  action: ReturnType<typeof myActivity.open>,
) {
  yield put(modal.open());
}

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
  yield takeLatest(Action.MY_ACTIVITY_POST_WINDOW_OPEN, openMyActivityWindow);
}

export default [fork(watchOpenMyActivityWindow), fork(watchRunGetMyActivity)];
