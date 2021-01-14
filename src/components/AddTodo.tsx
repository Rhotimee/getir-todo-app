import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  FormControl, Input, Button, Flex, Spinner,
} from '@chakra-ui/react';
import { addTodo } from '../actions';
import { State } from '../types/todo';

interface AddTodoProps {
  dispatch: Function,
  loading: boolean,
}

const AddTodo = ({ dispatch, loading }: AddTodoProps) => {
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
            autoFocus
          />
          <Button
            colorScheme="blue"
            isLoading={false}
            type="submit"
            borderLeftRadius={0}
            disabled={loading}
          >
            {loading ? (
              <Flex>
                Posting
                <Spinner ml="5" />
              </Flex>
            ) : 'Add todo'}
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
};

const mapStateToProps = (state: State) => ({
  loading: state.loading,
});

export default connect(mapStateToProps)(AddTodo);
