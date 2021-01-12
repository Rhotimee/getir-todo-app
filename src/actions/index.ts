import { ADD_TODO, UPDATE_TODO_STATUS } from '../constants/index';

export default function addTodo(title: string) {
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
