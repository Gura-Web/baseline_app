import { fork, takeLatest } from 'redux-saga/effects';
import * as Action from '../actions/modal/actions';
import { modal } from '../actions/modal/modal';

export function* openModal(action: ReturnType<typeof modal.open>) {}

function* closeModal(action: ReturnType<typeof modal.close>) {}

export function* watchOpenModal() {
  yield takeLatest(Action.MODAL_OPEN, openModal);
}

export function* watchCloseModal() {
  yield takeLatest(Action.MODAL_CLOSE, closeModal);
}

export default [fork(watchOpenModal), fork(watchCloseModal)];
