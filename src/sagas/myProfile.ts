import { call, put, takeLatest, all, fork } from 'redux-saga/effects';

import * as Action from '../actions/myProfile';
import { getMyProfile } from '../actions/baseline';
import { getMyProfileFactory } from '../services/api';

function* runGetMyProfile(action: ReturnType<typeof getMyProfile.start>) {
  try {
    const api = getMyProfileFactory();
    const user = yield call(api);

    yield put(getMyProfile.succeed({ user }));
  } catch (error) {
    yield put(getMyProfile.failed(error));
  }
}

export function* watchGetMyProfile() {
  yield takeLatest(Action.GET_MY_PROFILE_START, runGetMyProfile);
}

export default fork(watchGetMyProfile);
