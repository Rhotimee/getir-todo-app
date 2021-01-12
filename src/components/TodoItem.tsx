import React from 'react';
import {
  Text, Flex, IconButton, Box,
} from '@chakra-ui/react';
import { BsCircle, BsCheck } from 'react-icons/bs';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const renderItemIconButton = () => {
    if (todo.completed) {
      return <BsCheck />;
    }
    return <BsCircle />;
  };

  return (
    <Flex
      alignItems="center"
      shadow="md"
      borderRadius={5}
      cursor="pointer"
      _hover={{ shadow: 'xl' }}
      paddingX={2}
      paddingY={4}
      width="full"
    >
      <IconButton
        aria-label="complete task"
        icon={renderItemIconButton()}
        size="lg"
        variant="ghost"
      />
      <Box ml={4}>
        <Text
          fontSize="md"
          textDecoration={todo.completed ? 'line-through' : ''}
        >
          {todo.title}
        </Text>
      </Box>
    </Flex>
  );
}

export default TodoItem;
