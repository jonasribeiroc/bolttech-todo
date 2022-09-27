import { Box, Button, Flex, Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { CreateTaskDto } from '../../models';

interface IFormProps {
  isLoading: boolean;
  onSubmit: (createTaskDto: CreateTaskDto) => void;
}

export function AddTaskForm({
  isLoading,
  onSubmit,
}: IFormProps) {
  const [value, setValue] = useState<string>('');
  const toast = useToast();

  const handleSubmit = () => {
    if (value.length >= 3) {
      onSubmit({ name: value });
      setValue('');
    } else {
      toast({ title: 'Task name must to have 3 or more chars.', status: 'error' });
    };
  }

  return (
    <Box
      w={'full'}
    >
      <Flex marginInline={2} marginBlock={4}>
        <Input
          placeholder='Task'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          mr={2}
        />
        <Button
          type="submit"
          bgColor="primary"
          colorScheme="linkedin"
          loadingText="Entrando"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Flex>
    </Box>
  );
}
