import { call, put, takeLatest, all, fork } from 'redux-saga/effects';

import * as Action from '../actions/auth/login';
import { doLogin } from '../actions/auth/doLogin';
import { doLoginFactory } from '../services/auth';

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

export function* watchDoLogin() {
  yield takeLatest(Action.DO_LOGIN_START, runLogin);
}

export default fork(watchDoLogin);
