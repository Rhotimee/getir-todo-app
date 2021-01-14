import React, { useState } from 'react';
import {
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import { BsFillLockFill } from 'react-icons/bs';
import { updateUsername } from '../actions';

interface HeaderProps {
  dispatch: Function
}

const Header = ({ dispatch }: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [val, setVal] = useState('');

  return (
    <>
      <HStack justifyContent="space-between">
        <Heading fontSize={['xl', '2xl', '3xl']}>General List</Heading>
        <Button
          fontSize={['sm', 'md']}
          borderRadius={20}
          onClick={onOpen}
        >
          <BsFillLockFill />
          <Text ml={3}>Create private list</Text>
        </Button>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(updateUsername(val));
            setVal('');
            onClose();
          }}
          >
            <ModalHeader>What is your username?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                onChange={(e) => setVal(e.target.value)}
                value={val}
                placeholder="username"
                autoFocus
                required
              />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Create list
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default connect()(Header);
