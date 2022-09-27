import React, { ReactNode } from 'react';

import { Button, Heading, Image, Stack, StackProps } from '@chakra-ui/react';

import { imagens } from '@src/utils';

interface IFormProps extends StackProps {
  title: string;
  buttonTitle: string;
  buttonIsLoading: boolean;
  onSubmit: () => void;
  children: ReactNode;
}

export function Form({
  onSubmit,
  title,
  buttonTitle,
  buttonIsLoading,
  children,
  ...props
}: IFormProps) {
  return (
    <Stack
      as="form"
      spacing={2}
      mx="auto"
      maxW="lg"
      py={12}
      px={6}
      onSubmit={onSubmit}
      {...props}
    >
      <Stack align="center">
        <Image
          src={imagens.LOGO}
          alt="Bolttech ToDo logo"
          mb={6}
          maxH={20}
        />
      </Stack>
      <Stack
        spacing={6}
        rounded="xl"
        boxShadow="sm"
        border="1px solid lightgray"
      >
        <Heading fontSize="2xl" textAlign="center" mt={3}>
          {title}
        </Heading>
        {children}
        <Button
          type="submit"
          bgColor="primary"
          colorScheme="linkedin"
          loadingText="Entrando"
          borderTopRadius={0}
          isLoading={buttonIsLoading}
        >
          {buttonTitle}
        </Button>
      </Stack>
    </Stack>
  );
}
