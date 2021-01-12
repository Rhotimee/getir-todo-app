import {
  CLOSE_TODO_MODAL, UPDATE_TODO_STATUS, ADD_TODO, OPEN_TODO_MODAL, UPDATE_TODO_ITEM,
} from '../constants/index';

import { State } from '../types/todo';

const initialState: State = {
  todoList: [],
  showTodoModal: {
    isVisible: false,
    selected: null,
  },
};

export default function todoApp(state = initialState, action: any): State {
  switch (action.type) {
    case ADD_TODO: {
      const todoList = [
        {
          ...action.todoItem,
        },
        ...state.todoList,
      ];

      return {
        ...state,
        todoList,
        showTodoModal: {
          isVisible: true,
          selected: action.todoItem,
        },
      };
    }

    case UPDATE_TODO_STATUS: {
      const index = state.todoList.findIndex((todo) => todo._id === action.todoItem._id);
      const newTodoList = [...state.todoList];
      newTodoList[index].completed = !newTodoList[index].completed;

      return {
        ...state,
        todoList: newTodoList,
      };
    }

    case OPEN_TODO_MODAL:
      return {
        ...state,
        showTodoModal: {
          isVisible: true,
          selected: action.todoItem,
        },
      };

    case CLOSE_TODO_MODAL:
      return {
        ...state,
        showTodoModal: {
          isVisible: false,
          selected: null,
        },
      };

    case UPDATE_TODO_ITEM: {
      const index = state.todoList.findIndex((todo) => todo._id === action.todoItem._id);
      const newTodoList = [...state.todoList];
      newTodoList[index] = action.todoItem;

      return {
        ...state,
        todoList: newTodoList,
      };
    }

    default:
      return state;
  }
}
