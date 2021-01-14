import { State } from '../types/index';
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';

const initState = {
  todoList: {
    data: [
      {
        _id: "600018e6b03a7e00216bcaf9",
        title: "hello world",
        completed: false,
      }
    ],
    loading: false,
    error: false,
  },
  showTodoModal: {
    isVisible: false,
    selected: null,
  },
  loading: false,
};

function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState = initState),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children } ) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
