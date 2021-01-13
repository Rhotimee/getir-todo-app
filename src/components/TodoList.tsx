import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Text } from '@chakra-ui/react';
import { State, Todo } from '../types/todo';
import UnCompletedTodoList from './UnCompletedTodoList';
import CompletedTodoList from './CompletedTodoList';

interface TodoListProps {
  todoList: Todo[];
  loading: boolean;
}

const TodoList = ({ todoList, loading }: TodoListProps) => {
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

  if (loading) {
    return <Text>Loading....</Text>;
  }

  if (todoList.length === 0) {
    return <Text>You have no task todo yet. Please add one. </Text>;
  }

  return (
    <Box>
      <UnCompletedTodoList unCompletedTodos={unCompletedTodos} />
      <CompletedTodoList completedTodos={completedTodos} />
    </Box>
  );
};

const mapStateToProps = (state: State) => ({
  todoList: state.todoList.data,
  loading: state.todoList.loading,
});

export default connect(mapStateToProps)(TodoList);
