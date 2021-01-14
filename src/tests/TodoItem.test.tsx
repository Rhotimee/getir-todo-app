import React from 'react';
import TodoItem from '../components/TodoItem';
import { render } from './testUtil';

const todo = {
  _id: "600018e6b03a7e00216bcaf9",
  title: "helllo world",
  completed: false,
}
const setup = () => {
  const element = render(
      <TodoItem
        todo={todo}
      />
  )
  return { element }
}

test('renders todoItem title', () => {
  const { element } = setup()
  const title = element.getByText(todo.title);
  expect(title).toBeInTheDocument();
});

test('renders todoItem', () => {
  const { element } = setup()

  const todoItem = element.getByTestId('todo-item');
  expect(todoItem).toBeInTheDocument();
});
