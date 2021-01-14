import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Header from '../components/Header';
import { render, screen, fireEvent } from './testUtil';

const setup = () => {
  const history = createMemoryHistory();
  const header = render(
    <Router history={history}>
      <Header />
    </Router>
  )
  return { header, history }
}

test('renders heading texts', () => {
  const { header } = setup()
  const generalHeading = header.getByText(/General List/i);
  const privatetList = header.getByText(/Create private list/i);
  expect(generalHeading).toBeInTheDocument();
  expect(privatetList).toBeInTheDocument();
});

test('renders private link flow', () => {
  const { header, history } = setup()
  fireEvent(
    header.getByTestId('create-user-button'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );
  const modal = header.getByTestId('private-link-modal');
  expect(modal).toBeInTheDocument();

  const input = header.getByTestId('private-link-input');
  expect(input).toBeInTheDocument();
  const value = 'rotimi'
  fireEvent.change(
    input,
    {
      target: { value }
    }
  );
  // @ts-ignore
  expect(input.value).toBe(value);

  const btn = screen.getByText(/Create list/i)
  
  fireEvent(
    btn,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );
  
  expect(history.location.pathname).toBe(`/${value}`)
});
