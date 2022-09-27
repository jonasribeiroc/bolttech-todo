import React, {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useState,
} from 'react';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputProps as ChakraInputProps,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

export interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  children?: ReactNode;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error, children, type = 'text', ...rest }: InputProps,
  ref
) => {
  const isTypePassword = type === 'password' ?? false;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isInvalid={!!error}>
      {!!error && (
        <FormErrorMessage mb={1}>
          <Text fontWeight="bold" color="red.400">
            {error?.message}
          </Text>
        </FormErrorMessage>
      )}
      {!!label && (
        <FormLabel htmlFor={name}>
          <Text size="xsm" color="blue.heading">
            {label}
          </Text>
        </FormLabel>
      )}
      {isTypePassword ? (
        <InputGroup>
          <ChakraInput
            type={showPassword ? 'text' : 'password'}
            name={name}
            id={name}
            ref={ref}
            size="lg"
            {...rest}
          />
          <InputRightElement h="full">
            <Button
              variant="ghost"
              onClick={() =>
                setShowPassword((oldShowPassword) => !oldShowPassword)
              }
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : (
        <ChakraInput
          type={type}
          name={name}
          id={name}
          ref={ref}
          size="lg"
          {...rest}
        />
      )}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
