import { all } from 'redux-saga/effects';
import todosSagas from './todos/saga';

export default function* rootSaga(getState) {
  yield all([todosSagas()]);
}
