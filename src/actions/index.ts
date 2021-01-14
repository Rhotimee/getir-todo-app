import { Action, Todo } from '../types/index';

import {
  ADD_NEW_TODO,
  CLOSE_TODO_MODAL,
  OPEN_TODO_MODAL,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM,
  LOAD_TODO_LIST,
} from '../constants/index';

export function addTodo(title: string, username?: string | null): Action {
  return {
    type: ADD_NEW_TODO,
    payload: {
      title,
      username,
      completed: false,
    },
  };
}

export function updateTodoCompletionStatus(id: string, completed: boolean) {
  return {
    type: UPDATE_TODO_STATUS,
    payload: {
      id,
      completed,
    },
  };
}

export function updateTodoItem(todoItem: Todo) {
  return {
    type: UPDATE_TODO_ITEM,
    payload: todoItem,
  };
}

export function openTodoModal(todoItem: Todo) {
  return {
    type: OPEN_TODO_MODAL,
    payload: todoItem,
  };
}

export function closeTodoModal() {
  return {
    type: CLOSE_TODO_MODAL,
  };
}

export function deleteTodoItem(todoId: string) {
  return {
    type: DELETE_TODO_ITEM,
    payload: {
      todoId,
    },
  };
}

export function loadTodoList(username?: string) {
  return {
    type: LOAD_TODO_LIST,
    payload: {
      username,
    },
  };
}
