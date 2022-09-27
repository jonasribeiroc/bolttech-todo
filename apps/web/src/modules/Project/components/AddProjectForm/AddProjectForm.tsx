import { Box, Button, Heading, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { CreateProjectDto } from '../../models';

interface IFormProps {
  isLoading: boolean;
  onSubmit: (project: CreateProjectDto) => void;
}

export function AddProjectForm({
  onSubmit,
  isLoading,
}: IFormProps) {
  const [value, setValue] = useState<string>('')

  const handleSubmit = () => {
    onSubmit({ name: value });
    setValue('');
  }

  return (
    <Box
      bg={'gray.100'}
      boxShadow={'md'}
      rounded={'md'}
    >
      <Stack m={8} w={260}>
        <Heading fontSize="xl" textAlign="center">
          Create a new project
        </Heading>
        <Input
          placeholder='Project name'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          type="submit"
          bgColor="primary"
          colorScheme="linkedin"
          loadingText="Entrando"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Create project
        </Button>
      </Stack>
    </Box>
  );
}
