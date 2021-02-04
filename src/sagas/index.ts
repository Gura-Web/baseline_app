import { all } from 'redux-saga/effects';
import forks from './forks';

export default function* rootSaga() {
  yield all([...forks]);
}
