import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';
import {
  LOAD_TODO_LIST,
  RENDER_TODO_LIST,
  TODO_LIST_LOADING,
  UPDATE_LOADING,
  ADD_NEW_TODO,
  RENDER_NEW_TODO,
  UPDATE_TODO_ITEM,
  RENDER_UPDATED_TODO,
  REMOVE_DELETED_TODO,
  DELETE_TODO_ITEM,
  RENDER_UPDATED_TODO_STATUS,
  UPDATE_TODO_STATUS,
} from '../constants/index';
import Axios from '../helpers/axiosInstance';
import { Action } from '../types';

function* fetchTodoList(action: Action) {
  let route = '/';
  const { username } = action.payload;
  if (username) {
    route = `/private/${username}`;
  }
  yield put({ type: TODO_LIST_LOADING, payload: { loadingStatus: true } });
  const response = yield call(Axios, route);
  yield all([
    put({ type: RENDER_TODO_LIST, payload: { todoList: response.data } }),
    put({ type: TODO_LIST_LOADING, payload: { loadingStatus: false } }),
  ]);
}

function* addNewTodo(action: Action) {
  const route = '/';
  yield put({ type: UPDATE_LOADING, payload: { loading: true } });
  const response = yield call(Axios.post, route, action.payload);
  yield all([
    put({ type: RENDER_NEW_TODO, payload: { todoItem: response.data } }),
    put({ type: UPDATE_LOADING, payload: { loading: false } }),
  ]);
}

function* updateTodo(action: Action) {
  const route = `/${action.payload._id}`;
  yield put({ type: UPDATE_LOADING, payload: { loading: true } });
  const response = yield call(Axios.put, route, action.payload);
  yield all([
    put({ type: RENDER_UPDATED_TODO, payload: { todoItem: response.data } }),
    put({ type: UPDATE_LOADING, payload: { loading: false } }),
  ]);
}

function* deleteTodo(action: Action) {
  const { todoId } = action.payload;
  const route = `/${todoId}`;
  yield all([
    put({ type: REMOVE_DELETED_TODO, payload: { todoId } }),
    call(Axios.delete, route),
  ]);
}

function* updateTodoCompletionStatus(action: Action) {
  const { id, completed } = action.payload;
  const route = `/${id}`;
  yield put({ type: RENDER_UPDATED_TODO_STATUS, payload: { todoId: id } });
  yield call(Axios.put, route, { completed });
}

export default function* rootSaga() {
  yield all([
    takeEvery(LOAD_TODO_LIST, fetchTodoList),
    takeEvery(ADD_NEW_TODO, addNewTodo),
    takeEvery(UPDATE_TODO_ITEM, updateTodo),
    takeEvery(DELETE_TODO_ITEM, deleteTodo),
    takeEvery(UPDATE_TODO_STATUS, updateTodoCompletionStatus),
  ]);
}
