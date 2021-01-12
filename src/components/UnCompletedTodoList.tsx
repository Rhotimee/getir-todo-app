import { VStack } from '@chakra-ui/react';
import React from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface UnCompletedTodoListProps {
  unCompletedTodos: Todo[];
}

function UnCompletedTodoList({ unCompletedTodos }: UnCompletedTodoListProps) {
  return (
    <VStack mt={6} spacing={4}>
      {unCompletedTodos.map(
        (todo: Todo): JSX.Element => (
          <TodoItem todo={todo} key={todo._id} />
        ),
      )}
    </VStack>
  );
}

export default UnCompletedTodoList;
