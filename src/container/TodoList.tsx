import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Todo } from '../types/todo';
import UnCompletedTodoList from '../components/UnCompletedTodoList';
import CompletedTodoList from '../components/CompletedTodoList';

const todos: Todo[] = [
  {
    _id: '089',
    title:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita mollit',
    completed: false,
  },
  {
    _id: '189',
    title:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita mollit',
    completed: false,
  },
  {
    _id: '389',
    title:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita mollit',
    completed: false,
  },
  {
    _id: '289',
    title:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita mollit',
    completed: true,
  },
  {
    _id: '287',
    title:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita mollit',
    completed: true,
  },
];

const TodoList = () => {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [unCompletedTodos, setUnCompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const tempCompletedTodos: [] | Todo = [];
    const tempUnCompletedTodos: [] | Todo = [];

    todos.forEach((todo) => {
      if (todo.completed === true) {
        (tempCompletedTodos as Array<Todo>).push(todo);
      } else {
        (tempUnCompletedTodos as Array<Todo>).push(todo);
      }
    });

    setCompletedTodos(tempCompletedTodos);
    setUnCompletedTodos(tempUnCompletedTodos);
  }, [todos]);

  if (todos.length === 0) {
    return <Text>You have no task todo yet. Please add one. </Text>;
  }

  return (
    <Box>
      <UnCompletedTodoList unCompletedTodos={unCompletedTodos} />
      <CompletedTodoList completedTodos={completedTodos} />
    </Box>
  );
};

export default TodoList;
