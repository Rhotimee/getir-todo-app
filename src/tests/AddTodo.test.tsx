import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import AddTodo from '../components/AddTodo';
import { render, fireEvent, screen } from './testUtil';

const setup = () => {
  const history = createMemoryHistory();
  const element = render(
    <Router history={history}>
      <AddTodo />
    </Router>
  )
  return { element, history }
}


test('renders add todo component', () => {
  const { element } = setup();

  const button = element.getByText('Add todo');
  const input = element.getByPlaceholderText('New Todo');
  expect(button).toBeInTheDocument();
  expect(input).toBeInTheDocument();

  const value = "new todo"
  fireEvent.change(
    input,
    {
      target: { value }
    }
  );
  // @ts-ignore
  expect(input.value).toBe(value)

  fireEvent(
    button,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );

});
