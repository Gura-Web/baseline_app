import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { draft } from '../actions/draft/draft';
import { getDraftFactory } from '../services/draft';
import * as Action from '../actions/draft/actions';

export function* runGetDraft(action: ReturnType<typeof draft.start>) {
  try {
    const api = getDraftFactory();
    const drafts = yield call(api);

    yield put(draft.succeed({ drafts }));
  } catch (error) {
    yield put(draft.failed(error));
  }
}

export function* watchRunGetDraft() {
  yield takeLatest(Action.GET_DRAFT_START, runGetDraft);
}

export default [fork(watchRunGetDraft)];
