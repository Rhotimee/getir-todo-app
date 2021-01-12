import React from 'react';
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
import { CgDetailsLess, CgDetailsMore, CgTime } from 'react-icons/cg';
import { AiOutlineSave } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import { Todo } from '../types/todo';

interface TodoModalProps {
  isOpen: boolean
  onClose: () => void
  todo: Todo
}

function TodoModal({ isOpen, onClose, todo }: TodoModalProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" alignItems="center">
            <CgDetailsLess />
            <Input
              value={todo.title}
              width={3 / 4}
              textTransform="capitalize"
              variant="flushed"
              ml={3}
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
              value=""
            />
            <Button
              fontSize="sm"
              leftIcon={<CgTime />}
              variant="ghost"
            >
              Add Deadline
            </Button>
            <Flatpickr data-enable-time value={new Date()} onChange={() => {}} />
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
              colorScheme="blue"
              mr={3}
              rightIcon={<AiOutlineSave />}
              onClick={onClose}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TodoModal;
