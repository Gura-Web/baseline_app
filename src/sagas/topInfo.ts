import { call, fork, put, takeLatest } from 'redux-saga/effects';
import * as Action from '../actions/usecase/Top/actions';
import { topInfo } from '../actions/usecase/Top/top';
import { getTopInfo } from '../services/topInfo';

export function* runGetTopInfo() {
  try {
    const api = getTopInfo();
    const topInfomation = yield call(api);

    yield put(topInfo.getSucceed({ topInfo: topInfomation }));
  } catch (error) {
    yield put(topInfo.getFailed(error));
  }
}

export function* watchRunGetTopInfo() {
  yield takeLatest(Action.GET_TOP_INFO_START, runGetTopInfo);
}

export default [fork(watchRunGetTopInfo)];
