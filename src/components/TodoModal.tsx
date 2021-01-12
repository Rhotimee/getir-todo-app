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
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import { CgDetailsLess, CgDetailsMore, CgTime } from 'react-icons/cg';
import { AiOutlineSave } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import { Todo } from '../types/todo';
import { updateTodoItem } from '../actions';

interface TodoModalProps {
  isOpen: boolean
  onClose: () => void
  todo: Todo,
  dispatch: Function
}

function TodoModal({
  isOpen, onClose, todo, dispatch,
}: TodoModalProps) {
  const [title, setTitle] = useState(todo.title);
  const [detail, setDetail] = useState(todo.detail);
  const [deadline, setDeadline] = useState(todo.deadline || Date.now());

  const handleSubmit = () => {
    const updatedTodo = {
      _id: todo._id,
      title,
      completed: todo.completed,
      detail,
    };

    dispatch(updateTodoItem(updatedTodo));
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
              <Button
                fontSize="sm"
                leftIcon={<CgTime />}
                variant="ghost"
              >
                Add Deadline
              </Button>
              <Flatpickr data-enable-time value={deadline} onChange={(d) => setDeadline(d)} />
            </ModalBody>

            <ModalFooter justifyContent="space-between">
              <Tooltip label="Delete task" aria-label="Delete task">
                <IconButton
                  variant="outline"
                  colorScheme="red"
                  aria-label="Delete task"
                  icon={<RiDeleteBin6Line />}
                  onClick={onClose}
                />
              </Tooltip>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                rightIcon={<AiOutlineSave />}
              >
                Update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default connect()(TodoModal);
