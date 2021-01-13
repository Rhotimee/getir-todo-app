import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  Text,
  Flex,
  IconButton,
  Tooltip,
  Spinner,
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import { CgDetailsLess, CgDetailsMore, CgTime } from 'react-icons/cg';
import { AiOutlineSave } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import { State, Todo } from '../types/todo';
import { deleteTodoItem, updateTodoItem } from '../actions';

interface TodoModalProps {
  isOpen: boolean
  onClose: () => void
  todo: Todo,
  dispatch: Function,
  loading: boolean,
}

function TodoModal({
  isOpen, onClose, todo, dispatch, loading,
}: TodoModalProps) {
  const [title, setTitle] = useState(todo.title);
  const [detail, setDetail] = useState(todo.detail);
  const [deadline, setDeadline] = useState(todo.deadline);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedTodo = {
      _id: todo._id,
      title,
      completed: todo.completed,
      detail,
      deadline,
    };

    dispatch(updateTodoItem(updatedTodo));
    onClose();
  };

  const handleTodoDelete = () => {
    dispatch(deleteTodoItem(todo._id));
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader display="flex" alignItems="center">
              <CgDetailsLess />
              <Input
                value={title}
                isRequired
                width={3 / 4}
                textTransform="capitalize"
                variant="flushed"
                ml={3}
                onChange={(event) => setTitle(event.target.value)}
              />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex alignItems="center" mb={2}>
                <CgDetailsMore />
                <Text ml={3}>Details </Text>
              </Flex>
              <Textarea
                placeholder="Add task details"
                value={detail}
                onChange={(event) => setDetail(event.target.value)}
              />

              <Flex alignItems="center">
                <Tooltip label="Set deadline" aria-label="Set deadline">
                  <IconButton
                    aria-label="Deadline"
                    fontSize="lg"
                    icon={<CgTime />}
                    variant="ghost"
                  />
                </Tooltip>
                <Flatpickr
                  data-enable-time
                  value={deadline}
                  onChange={(date) => setDeadline(date[0])}
                  options={{
                    minDate: 'today',
                  }}
                />
              </Flex>
            </ModalBody>

            <ModalFooter justifyContent="space-between">
              <Tooltip label="Delete task" aria-label="Delete task">
                <IconButton
                  variant="outline"
                  colorScheme="red"
                  aria-label="Delete task"
                  icon={<RiDeleteBin6Line />}
                  onClick={handleTodoDelete}
                />
              </Tooltip>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                rightIcon={<AiOutlineSave />}
                disabled={loading}
              >
                {loading ? <Spinner /> : 'Update'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

const mapStateToProps = (state: State) => ({
  loading: state.todoList.loading,
});

export default connect(mapStateToProps)(TodoModal);
