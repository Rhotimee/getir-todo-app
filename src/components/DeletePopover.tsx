import React from 'react';
import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  HStack,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface DeletePopoverProps {
  onConfirm: () => void
}

const DeletePopover = ({ onConfirm }: DeletePopoverProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  const handleConfirmYes = () => {
    onConfirm();
    onClose();
  };

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <IconButton
          variant="outline"
          colorScheme="red"
          aria-label="Delete task"
          icon={<RiDeleteBin6Line />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>
          <Text>Are you sure you want to delete this todo?</Text>
          <HStack mt="3">
            <Button colorScheme="blue" variant="outline" onClick={handleConfirmYes}>Yes</Button>
            <Button colorScheme="red" variant="outline" ml="3" onClick={onClose}>No</Button>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DeletePopover;
