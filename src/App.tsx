import React from 'react';
import { Container } from '@chakra-ui/react';
import Header from './components/Header';
import AddTodo from './container/AddTodo';
import TodoList from './container/TodoList';

const App = () => (
  <Container my={10}>
    <Header />
    <AddTodo />
    <TodoList />
  </Container>
);

export default App;
