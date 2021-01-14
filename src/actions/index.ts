import { Todo } from '../types/todo';
import {
  ADD_NEW_TODO,
  CLOSE_TODO_MODAL,
  OPEN_TODO_MODAL,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM,
  LOAD_TODO_LIST,
} from '../constants/index';

export function addTodo(title: string) {
  return {
    type: ADD_NEW_TODO,
    todoItem: {
      title,
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
    todoItem,
  };
}

export function openTodoModal(todoItem: Todo) {
  return {
    type: OPEN_TODO_MODAL,
    todoItem,
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
    todoId,
  };
}

export function loadTodoList() {
  return {
    type: LOAD_TODO_LIST,
  };
}
