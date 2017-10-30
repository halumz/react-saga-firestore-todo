import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import { step } from './reducer';
import FireStore from '../../helper/fireStore';

export function* changedTodo() {
  yield takeEvery(actions.CHANGE_TODO, function*() {});
}
export function* addTodo({ payload }) {
  const { newTodoText } = payload;
  const todo = {
    todo: newTodoText,
    createTime: new Date().getTime(),
    completed: false
  };
  const fsResult = yield call(FireStore.addTodo, todo);
  if (fsResult.id) {
    todo.id = fsResult.id;
    yield put(actions.addTodoReturn(todo));
  }
}

export function* deleteTodo({ payload }) {
  const { todo } = payload;
  yield call(FireStore.deleteTodo, todo);
  yield put(actions.deleteTodoReturn(todo));
}

export function* editTodo({ payload }) {
  const { todo } = payload;
  yield call(FireStore.editTodo, todo);
  yield put(actions.editTodoReturn(todo));
}

export function* completeTodo({ payload }) {
  const { todo } = payload;
  yield call(FireStore.editTodo, todo);
  yield put(actions.editTodoReturn(todo));
}

export function* completeAll({ payload }) {
  yield call(FireStore.completeAll, payload);
  yield put(actions.completeAllReturn());
}
export function* deleteCompleted({ payload }) {
  yield call(FireStore.deleteCompleted, payload);
  yield put(actions.deleteCompletedReturn());
}
export function* showMore() {
  const payload = { step };
  const newTodos = yield call(FireStore.readTodos, payload);
  const showAllenabled = step === newTodos.length;
  yield put(actions.showMoreReturn(newTodos, showAllenabled));
}
export default function* rootSaga() {
  yield all([
    takeEvery(actions.ADD_TODO, addTodo),
    takeEvery(actions.DELETE_TODO, deleteTodo),
    takeEvery(actions.EDIT_TODO, editTodo),
    takeEvery(actions.COMPLETE_TODO, completeTodo),
    takeEvery(actions.ALL_COMPLETED, completeAll),
    takeEvery(actions.DELETE_COMPLETED, deleteCompleted),
    takeEvery(actions.SHOW_MORE, showMore)
  ]);
}
