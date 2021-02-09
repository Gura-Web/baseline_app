import { take, select, takeLatest, fork } from 'redux-saga/effects';
import { reload } from '../actions/reload/reload';

import * as Action from '../actions/reload/actions';

function* runReload(action: ReturnType<typeof reload.reloadStart>) {
  const state = yield select();
  console.log(state.reload);
  // try
  //
  // }
}

export function* watchReload() {
  yield takeLatest(Action.RELOAD_START, runReload);
}

export default [fork(watchReload)];
