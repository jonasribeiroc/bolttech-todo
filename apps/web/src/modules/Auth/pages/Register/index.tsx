import { Stack, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Form, Input } from '@src/modules/Auth/components';
import { RegisterAuthDTO } from '@src/modules/Auth/models';
import { useAuth } from '@src/modules/Auth/hooks';
import { registerValidationSchema } from './utils';

export function Register() {
  const { signUp } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<RegisterAuthDTO>({
    resolver: yupResolver(registerValidationSchema),
  });
  const handleRegister = handleSubmit(async (data) => {
    const response = await signUp(data);
  });

  return (
    <Form
      onSubmit={handleRegister}
      title="Cadastrar"
      buttonIsLoading={isSubmitting || isValidating}
      buttonTitle="Cadastrar"
    >
      <Stack spacing={4} px={8}>
        <Input placeholder="Nome" error={errors.name} {...register('name')} />
        <Input
          placeholder="Email"
          error={errors.email}
          type="email"
          {...register('email')}
        />
        <Input
          placeholder="Senha"
          type="password"
          error={errors.password}
          {...register('password')}
        />
      </Stack>
      <Stack spacing={8} px={[10, 20]} textAlign="center">
        <Link to="/">
          <Text color="blue.400">Já tem uma conta?</Text>
        </Link>
      </Stack>
    </Form>
  );
}
