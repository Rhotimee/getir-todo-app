import { ADD_TODO } from '../constants/index';

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
