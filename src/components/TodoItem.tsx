import React from 'react';
import {
  Text, IconButton, HStack, VStack,
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import { BsCircle, BsCheck } from 'react-icons/bs';
import { AiOutlineExpandAlt, AiOutlineFieldTime } from 'react-icons/ai';
import formatDistance from 'date-fns/formatDistance';
import { parseISO } from 'date-fns';
import { Todo } from '../types';
import { updateTodoCompletionStatus, openTodoModal } from '../actions';

interface TodoItemProps {
  todo: Todo;
  dispatch: Function;
}

function TodoItem({ todo, dispatch }: TodoItemProps) {
  const onOpenTodoModal = () => {
    dispatch(openTodoModal(todo));
  };

  const renderItemIconButton = () => {
    if (todo.completed) {
      return <BsCheck />;
    }
    return <BsCircle />;
  };

  const updateCompletionStatus = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    dispatch(updateTodoCompletionStatus(todo._id, !todo.completed));
  };

  const renderTimeLeftToComplete = () => {
    if (!todo.deadline) return '';

    const timeLeft = formatDistance(
      parseISO(todo.deadline.toString()),
      Date.now(),
      { addSuffix: true },
    );

    return `Deadline ${timeLeft}`;
  };

  return (
    <VStack
      alignItems="flex-start"
      shadow="md"
      borderRadius={5}
      cursor="pointer"
      _hover={{ shadow: 'xl' }}
      paddingX={2}
      paddingY={4}
      width="full"
      onClick={onOpenTodoModal}
      data-testid="todo-item"
    >
      <HStack
        alignItems="flex-start"
        justifyContent="space-between"
        width="full"
      >
        <HStack
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <IconButton
            aria-label="complete task"
            icon={renderItemIconButton()}
            size="lg"
            variant="ghost"
            minWidth={8}
            height={8}
            onClick={updateCompletionStatus}
          />
          <VStack ml={4} width="full" alignItems="flex-start">
            <Text
              fontSize="xl"
              textDecoration={todo.completed ? 'line-through' : 'none'}
              textTransform="capitalize"
            >
              {todo.title}
            </Text>

            {todo.detail && (
            <Text
              fontSize="md"
              textDecoration={todo.completed ? 'line-through' : 'none'}
            >
              { todo.detail }
            </Text>
            )}
          </VStack>
        </HStack>
        <IconButton
          aria-label="expand"
          icon={<AiOutlineExpandAlt />}
          size="lg"
          variant="ghost"
          minWidth={8}
          height={8}
        />
      </HStack>
      {todo.deadline && (
        <HStack
          alignItems="center"
          pr={4}
          width="full"
          justifyContent="flex-end"
        >
          <AiOutlineFieldTime />
          <Text fontSize="xs" ml="2">
            { renderTimeLeftToComplete() }
          </Text>
        </HStack>
      )}
    </VStack>
  );
}

export default connect()(TodoItem);
