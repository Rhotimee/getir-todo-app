import React, { useState } from 'react';
import {
  FormControl, Input, Button, Flex,
} from '@chakra-ui/react';

const AddTodo = () => {
  const [todo, setTodo] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(todo);
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

export default AddTodo;
