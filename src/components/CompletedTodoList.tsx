import {
  Box, Heading, HStack, IconButton, VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai';
import { Todo } from '../types';
import TodoItem from './TodoItem';

interface CompletedTodoListProps {
  completedTodos: Todo[];
}

function UnCompletedTodoList({ completedTodos }: CompletedTodoListProps) {
  const [showCompletedTodoList, setShowCompletedTodoList] = useState(true);

  const renderDirectionIcon = () => {
    if (showCompletedTodoList) {
      return <AiOutlineUp />;
    }
    return <AiOutlineDown />;
  };

  const handleDirectionClick = () => {
    setShowCompletedTodoList(!showCompletedTodoList);
  };

  return (
    <Box mt={8}>
      <HStack width="full" justifyContent="space-between">
        <Heading size="md">
          Completed(
          {completedTodos.length}
          )
        </Heading>
        <IconButton
          aria-label="list completed tasks"
          icon={renderDirectionIcon()}
          size="lg"
          variant="ghost"
          onClick={handleDirectionClick}
        />
      </HStack>
      {showCompletedTodoList && (
        <VStack mt={6} spacing={4}>
          {completedTodos.map(
            (todo: Todo): JSX.Element => (
              <TodoItem todo={todo} key={todo._id} />
            ),
          )}
        </VStack>
      )}
    </Box>
  );
}

export default UnCompletedTodoList;
