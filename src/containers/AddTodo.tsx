import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  FormControl, Input, Button, Flex,
} from '@chakra-ui/react';
import addTodo from '../actions';

interface AddTodoProps {
  dispatch: Function
}

const AddTodo = ({ dispatch }: AddTodoProps) => {
  const [todo, setTodo] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addTodo(todo));
    setTodo('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl mt={5} isRequired>
        <Flex>
          <Input
            type="text"
            placeholder="New Task"
            value={todo}
            onChange={handleInputChange}
            borderRightRadius={0}
          />
          <Button
            colorScheme="blue"
            isLoading={false}
            type="submit"
            borderLeftRadius={0}
          >
            Add todo
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
};

export default connect()(AddTodo);
