import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';
import { LOAD_TODO_LIST, RENDER_TODO_LIST, TODO_LIST_LOADING } from '../constants/index';

export function* fetchTodoList() {
  const endpoint = 'https://simple-todo-nest.herokuapp.com/todos';
  yield put({ type: TODO_LIST_LOADING, loadingStatus: true });
  const response = yield call(fetch, endpoint);
  const data = yield response.json();
  yield put({ type: RENDER_TODO_LIST, todoList: data });
  yield put({ type: TODO_LIST_LOADING, loadingStatus: false });
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(LOAD_TODO_LIST, fetchTodoList),
  ]);
}
