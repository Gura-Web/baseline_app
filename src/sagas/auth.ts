import { call, put, takeLatest, all, fork } from 'redux-saga/effects';

import * as Action from '../actions/auth/login';
import { doLogin } from '../actions/auth/doLogin';
import { doLoginFactory } from '../services/auth';

function* runGetMyProfile(action: ReturnType<typeof doLogin.start>) {
  try {
    const api = doLoginFactory();
    yield call(api);

    yield put(doLogin.succeed());
  } catch (error) {
    yield put(doLogin.failed(error));
  }
}

export function* watchDoLogin() {
  yield takeLatest(Action.DO_LOGIN_START, runGetMyProfile);
}

export default fork(watchDoLogin);
