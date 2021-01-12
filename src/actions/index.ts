import { Todo } from '../types/todo';
import {
  ADD_TODO,
  CLOSE_TODO_MODAL,
  OPEN_TODO_MODAL,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM,
} from '../constants/index';

export function addTodo(title: string) {
  return {
    type: ADD_TODO,
    todoItem: {
      _id: new Date().getTime(),
      title,
      completed: false,
    },
  };
}

export function updateTodoCompletionStatus(id: string) {
  return {
    type: UPDATE_TODO_STATUS,
    todoItem: {
      _id: id,
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
