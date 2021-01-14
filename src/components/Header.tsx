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
import { useHistory } from 'react-router-dom';
import { BsFillLockFill } from 'react-icons/bs';
import { loadTodoList } from '../actions';

interface HeaderProps {
  dispatch: Function
}

const Header = ({ dispatch }: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [val, setVal] = useState('');
  const history = useHistory();
  const { pathname } = history.location;
  const username = pathname.substring(1);

  return (
    <>
      <HStack justifyContent="space-between">
        <Heading fontSize={['xl', '2xl', '3xl']} textTransform="capitalize">
          {pathname === '/' ? 'General List' : `${username}'s List`}
        </Heading>
        <Button
          fontSize={['sm', 'md']}
          borderRadius={20}
          onClick={onOpen}
          data-testid="create-user-button"
        >
          <BsFillLockFill />
          <Text ml={3}>
            Create
            { username ? ' new' : ' private' }
            {' '}
            list
          </Text>
        </Button>
      </HStack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          data-testid="private-link-modal"
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(loadTodoList(val));
            history.push(val);
            setVal('');
            onClose();
          }}
          >
            <ModalHeader>What is the private link name?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                type="text"
                data-testid="private-link-input"
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
