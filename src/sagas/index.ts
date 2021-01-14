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

function* fetchTodoList(action: any) {
  let route = '/';
  const { username } = action.payload;
  if (username) {
    route = `/private/${username}`;
  }
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
    put({ type: RENDER_NEW_TODO, todoItem: response.data }),
    put({ type: UPDATE_LOADING, loading: false }),
  ]);
}

function* updateTodo(action: any) {
  const route = `/${action.todoItem._id}`;
  yield put({ type: UPDATE_LOADING, loading: true });
  const response = yield call(Axios.put, route, action.todoItem);
  yield all([
    put({ type: RENDER_UPDATED_TODO, todoItem: response.data }),
    put({ type: UPDATE_LOADING, loading: false }),
  ]);
}

function* deleteTodo(action: any) {
  const route = `/${action.todoId}`;
  yield all([
    put({ type: REMOVE_DELETED_TODO, todoId: action.todoId }),
    call(Axios.delete, route),
  ]);
}

function* updateTodoCompletionStatus(action: any) {
  const route = `/${action.payload.id}`;
  yield put({ type: RENDER_UPDATED_TODO_STATUS, todoId: action.payload.id });
  yield call(Axios.put, route, { completed: action.payload.completed });
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(LOAD_TODO_LIST, fetchTodoList),
    yield takeEvery(ADD_NEW_TODO, addNewTodo),
    yield takeEvery(UPDATE_TODO_ITEM, updateTodo),
    yield takeEvery(DELETE_TODO_ITEM, deleteTodo),
    yield takeEvery(UPDATE_TODO_STATUS, updateTodoCompletionStatus),
  ]);
}
