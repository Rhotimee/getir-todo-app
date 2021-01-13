import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';
import {
  LOAD_TODO_LIST, RENDER_TODO_LIST, TODO_LIST_LOADING, UPDATE_LOADING, ADD_TODO, ADD_NEW_TODO,
} from '../constants/index';
import Axios from '../helpers/axiosInstance';

function* fetchTodoList() {
  const route = '/';
  yield put({ type: TODO_LIST_LOADING, loadingStatus: true });
  const response = yield call(Axios, route);
  yield all([
    put({ type: RENDER_TODO_LIST, todoList: response.data }),
    put({ type: TODO_LIST_LOADING, loadingStatus: false }),
  ]);
}

function* addNewTodo(action: any) {
  const route = '/';
  yield put({ type: UPDATE_LOADING, loading: true });
  const response = yield call(Axios.post, route, action.todoItem);
  yield all([
    put({ type: ADD_NEW_TODO, todoItem: response.data }),
    put({ type: UPDATE_LOADING, loading: false }),
  ]);
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(LOAD_TODO_LIST, fetchTodoList),
    yield takeEvery(ADD_TODO, addNewTodo),
  ]);
}
