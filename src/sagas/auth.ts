import { call, put, takeLatest, all, fork } from 'redux-saga/effects';

import * as Action from '../actions/auth/login';
import { doLogin } from '../actions/auth/doLogin';
import { doLoginFactory } from '../services/auth';

function* readLogin(action: ReturnType<typeof doLogin.init>) {}

function* runLogin(action: ReturnType<typeof doLogin.start>) {
  const { params } = action.payload;

  try {
    const api = doLoginFactory(params);
    yield call(api);

    yield put(doLogin.succeed(params));
  } catch (error) {
    yield put(doLogin.failed(params, error));
  }
}

function* watchDoLogin() {
  yield takeLatest(Action.DO_LOGIN_START, runLogin);
}

function* watchGetLoginPage() {
  yield takeLatest(Action.DO_LOGIN_START, readLogin);
}

export default [fork(watchDoLogin), fork(watchGetLoginPage)];
