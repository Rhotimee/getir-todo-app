import {
  CLOSE_TODO_MODAL,
  UPDATE_TODO_STATUS,
  OPEN_TODO_MODAL,
  RENDER_UPDATED_TODO,
  DELETE_TODO_ITEM,
  RENDER_TODO_LIST,
  TODO_LIST_LOADING,
  RENDER_NEW_TODO,
  UPDATE_LOADING,
} from '../constants/index';

import { State } from '../types/todo';

const initialState: State = {
  todoList: {
    data: [],
    loading: false,
    error: false,
  },
  showTodoModal: {
    isVisible: false,
    selected: null,
  },
  loading: false,
};

export default function todoApp(state = initialState, action: any): State {
  switch (action.type) {
    case RENDER_NEW_TODO: {
      const todoListData = [
        action.todoItem,
        ...state.todoList.data,
      ];

      return {
        ...state,
        todoList: {
          ...state.todoList,
          data: todoListData,
        },
        showTodoModal: {
          isVisible: true,
          selected: action.todoItem,
        },
      };
    }

    case UPDATE_TODO_STATUS: {
      const index = state.todoList.data.findIndex((todo) => todo._id === action.todoItem._id);
      const newTodoListData = [...state.todoList.data];
      newTodoListData[index].completed = !newTodoListData[index].completed;

      return {
        ...state,
        todoList: {
          ...state.todoList,
          data: newTodoListData,
        },
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

    case RENDER_UPDATED_TODO: {
      const index = state.todoList.data.findIndex((todo) => todo._id === action.todoItem._id);
      const newTodoListData = [...state.todoList.data];
      newTodoListData[index] = action.todoItem;

      return {
        ...state,
        todoList: {
          ...state.todoList,
          data: newTodoListData,
        },
      };
    }

    case DELETE_TODO_ITEM: {
      const newTodoListData = state.todoList.data.filter(
        (todo) => todo._id !== action.todoId,
      );

      return {
        ...state,
        todoList: {
          ...state.todoList,
          data: newTodoListData,
        },
      };
    }

    case RENDER_TODO_LIST:
      return {
        ...state,
        todoList: {
          ...state.todoList,
          data: action.todoList,
        },
      };

    case TODO_LIST_LOADING:
      return {
        ...state,
        todoList: {
          ...state.todoList,
          loading: action.loadingStatus,
        },
      };

    case UPDATE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    default:
      return state;
  }
}
