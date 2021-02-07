import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { draft } from '../actions/draft/draft';
import { getDraftFactory, registDraftFactory } from '../services/draft';
import * as Action from '../actions/draft/actions';

export function* runGetDraft(action: ReturnType<typeof draft.getStart>) {
  try {
    const api = getDraftFactory();
    const drafts = yield call(api);

    yield put(draft.getSucceed({ drafts }));
  } catch (error) {
    yield put(draft.getFailed(error));
  }
}

export function* runRegistDraft(action: ReturnType<typeof draft.registStart>) {
  const { params } = action.payload;

  try {
    const api = registDraftFactory(params.contents);
    yield call(api);

    yield put(draft.registSucceed());
    yield put(draft.getStart());
  } catch (error) {
    yield put(draft.registFailed(error));
  }
}

export function* watchRunGetDraft() {
  yield takeLatest(Action.GET_DRAFT_START, runGetDraft);
}

export function* watchRunRegistDraft() {
  yield takeLatest(Action.REGIST_DRAFT_START, runRegistDraft);
}

export default [fork(watchRunGetDraft), fork(watchRunRegistDraft)];
