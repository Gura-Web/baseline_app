import { select, takeLatest, fork, put } from 'redux-saga/effects';
import { reload, SetReloadParams } from '../actions/reload/reload';

import * as Action from '../actions/reload/actions';

function* runReload() {
  const state = yield select();
  const reloadState: SetReloadParams = state.reload;

  try {
    yield* reloadState.reloadHandlers.map(reloadHandle => reloadHandle());

    yield put(reload.reloadSucceed());
  } catch (error) {
    yield put(reload.reloadFailed(error));
  }
}

export function* watchReload() {
  yield takeLatest(Action.RELOAD_START, runReload);
}

export default [fork(watchReload)];
