import { call, put, takeLatest, fork } from 'redux-saga/effects';

import * as Action from '../actions/auth/auth';
import { doLogin } from '../actions/auth/doLogin';
import { getMyProfile } from '../actions/baseline';
import { doLoginFactory, doLogoutFactory } from '../services/auth';

function* runLogin(action: ReturnType<typeof doLogin.loginStart>) {
  const { params } = action.payload;

  try {
    const api = doLoginFactory(params);
    yield call(api);

    yield put(doLogin.loginSucceed(params));
  } catch (error) {
    yield put(doLogin.loginFailed(params, error));
  }
}

function* runLogout() {
  try {
    const api = doLogoutFactory();
    yield call(api);

    yield put(doLogin.logoutSucceed());
    yield put(getMyProfile.start());
  } catch (error) {
    yield put(doLogin.logoutFailed(error));
  }
}

function* watchDoLogin() {
  yield takeLatest(Action.DO_LOGIN_START, runLogin);
}

function* watchDoLogout() {
  yield takeLatest(Action.DO_LOGOUT_START, runLogout);
}

export default [fork(watchDoLogin), fork(watchDoLogout)];
