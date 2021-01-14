import {
  CLOSE_TODO_MODAL,
  OPEN_TODO_MODAL,
  RENDER_UPDATED_TODO,
  RENDER_TODO_LIST,
  TODO_LIST_LOADING,
  RENDER_NEW_TODO,
  UPDATE_LOADING,
  REMOVE_DELETED_TODO,
  RENDER_UPDATED_TODO_STATUS,
} from '../constants/index';

import { Action, State } from '../types';

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

export default function todoApp(state = initialState, action: Action): State {
  switch (action.type) {
    case RENDER_NEW_TODO: {
      const todoListData = [
        action.payload.todoItem,
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
          selected: action.payload.todoItem,
        },
      };
    }

    case RENDER_UPDATED_TODO_STATUS: {
      const index = state.todoList.data.findIndex(
        (todo) => todo._id === action.payload.todoId,
      );
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
          selected: action.payload,
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
      const index = state.todoList.data.findIndex(
        (todo) => todo._id === action.payload.todoItem._id,
      );
      const newTodoListData = [...state.todoList.data];
      newTodoListData[index] = action.payload.todoItem;

      return {
        ...state,
        todoList: {
          ...state.todoList,
          data: newTodoListData,
        },
      };
    }

    case REMOVE_DELETED_TODO: {
      const newTodoListData = state.todoList.data.filter(
        (todo) => todo._id !== action.payload.todoId,
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
          data: action.payload.todoList,
        },
      };

    case TODO_LIST_LOADING:
      return {
        ...state,
        todoList: {
          ...state.todoList,
          loading: action.payload.loadingStatus,
        },
      };

    case UPDATE_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    default:
      return state;
  }
}
