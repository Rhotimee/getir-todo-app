import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Box, Stack, Text, Skeleton,
} from '@chakra-ui/react';
import { ShowTodoModal, State, Todo } from '../types/todo';
import UnCompletedTodoList from './UnCompletedTodoList';
import CompletedTodoList from './CompletedTodoList';
import TodoModal from './TodoModal';
import { closeTodoModal } from '../actions';

interface TodoListProps {
  todoList: Todo[];
  dispatch: Function;
  showTodoModal: ShowTodoModal;
  todoListLoading: boolean;
}

const TodoList = ({
  todoList, dispatch, showTodoModal, todoListLoading,
}: TodoListProps) => {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [unCompletedTodos, setUnCompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const tempCompletedTodos: [] | Todo = [];
    const tempUnCompletedTodos: [] | Todo = [];

    todoList.forEach((todo) => {
      if (todo.completed === true) {
        (tempCompletedTodos as Array<Todo>).push(todo);
      } else {
        (tempUnCompletedTodos as Array<Todo>).push(todo);
      }
    });

    setCompletedTodos(tempCompletedTodos);
    setUnCompletedTodos(tempUnCompletedTodos);
  }, [todoList]);

  if (todoListLoading) {
    const numberOfSkeletons = 5;
    return (
      <Stack mt={6}>
        {Array.from(Array(numberOfSkeletons).keys()).map((key) => <Skeleton height="100px" key={key} />)}
      </Stack>
    );
  }

  if (todoList.length === 0) {
    return <Text>You have no task todo yet. Please add one. </Text>;
  }

  const onCloseTodoModal = () => {
    dispatch(closeTodoModal());
  };

  return (
    <Box>
      <UnCompletedTodoList unCompletedTodos={unCompletedTodos} />
      <CompletedTodoList completedTodos={completedTodos} />
      {showTodoModal.selected && (
        <TodoModal
          isOpen={showTodoModal.isVisible}
          onClose={onCloseTodoModal}
          todo={showTodoModal.selected}
        />
      )}
    </Box>
  );
};

const mapStateToProps = (state: State) => ({
  todoList: state.todoList.data,
  todoListLoading: state.todoList.loading,
  showTodoModal: state.showTodoModal,
});

export default connect(mapStateToProps)(TodoList);
