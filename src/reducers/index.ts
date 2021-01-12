import { State, Action } from '../types/todo';

import { ADD_TODO } from '../constants/index';

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

    default:
      return state;
  }
}
