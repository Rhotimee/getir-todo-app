import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import TodoList from '../components/TodoList';
import { render, screen, fireEvent, act, waitFor } from './testUtil';

const setup = () => {
  const history = createMemoryHistory();
  const element = render(
    <Router history={history}>
      <TodoList />
    </Router>,
  )
  return { element, history }
}


test('renders todoList', async () => {
  const { element } = setup()

  const todoListElement = element.getByTestId('todo-list');
  const todoItemElement = element.getByTestId('todo-item');
  expect(todoListElement).toBeInTheDocument();
  expect(todoItemElement).toBeInTheDocument();
});

test('renders todo item modal', async () => {
  const { element } = setup()

  const todoItemElement = element.getByTestId('todo-item');

  fireEvent(
    todoItemElement,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )

  const todoItemModal = await element.getByTestId('todo-item-modal')
  expect(todoItemModal).toBeInTheDocument
});


