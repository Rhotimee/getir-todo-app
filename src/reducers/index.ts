import { UPDATE_TODO_STATUS, ADD_TODO } from '../constants/index';
import { State, Action } from '../types/todo';

const initialState: State = {
  todoList: [],
};

export default function todoApp(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoList: [
          {
            ...action.todoItem,
          },
          ...state.todoList,
        ],
      };

    case UPDATE_TODO_STATUS: {
      /* eslint no-underscore-dangle: 0 */
      const index = state.todoList.findIndex((todo) => todo._id === action.todoItem._id);
      const newTodoList = [...state.todoList];
      newTodoList[index].completed = !newTodoList[index].completed;

      return {
        ...state,
        todoList: newTodoList,
      };
    }

    default:
      return state;
  }
}
