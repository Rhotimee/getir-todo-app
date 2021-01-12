import React from 'react';
import { Container } from '@chakra-ui/react';
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

const App = () => (
  <Container my={10}>
    <Header />
    <AddTodo />
    <TodoList />
  </Container>
);

export default App;
