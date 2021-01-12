import React from 'react';
import {
  Text, Flex, IconButton, Box,
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import { BsCircle, BsCheck } from 'react-icons/bs';
import { ShowTodoModal, State, Todo } from '../types/todo';
import { updateTodoCompletionStatus, openTodoModal, closeTodoModal } from '../actions';
import TodoModal from './TodoModal';

interface TodoItemProps {
  todo: Todo;
  dispatch: Function;
  showTodoModal: ShowTodoModal;
}

function TodoItem({ todo, dispatch, showTodoModal }: TodoItemProps) {
  const onOpenTodoModal = () => {
    dispatch(openTodoModal(todo));
  };

  const onCloseTodoModal = () => {
    dispatch(closeTodoModal());
  };

  const renderItemIconButton = () => {
    if (todo.completed) {
      return <BsCheck />;
    }
    return <BsCircle />;
  };

  const updateCompletionStatus = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    dispatch(updateTodoCompletionStatus(todo._id));
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
      onClick={onOpenTodoModal}
    >
      <IconButton
        aria-label="complete task"
        icon={renderItemIconButton()}
        size="lg"
        variant="ghost"
        /* eslint no-underscore-dangle: 0 */
        onClick={updateCompletionStatus}
      />
      <Box ml={4}>
        <Text
          fontSize="md"
          textDecoration={todo.completed ? 'line-through' : ''}
          textTransform="capitalize"
        >
          {todo.title}
        </Text>
      </Box>
      {showTodoModal.selected ? (
        <TodoModal
          isOpen={showTodoModal.isVisible}
          onClose={onCloseTodoModal}
          todo={showTodoModal.selected}
        />
      ) : null}
    </Flex>
  );
}

const mapStateToProps = (state: State) => ({
  showTodoModal: state.showTodoModal,
});

export default connect(mapStateToProps)(TodoItem);
