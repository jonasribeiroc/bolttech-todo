import { Stack, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Form, Input } from '@src/modules/Auth/components';
import { LoginAuthDTO } from '@src/modules/Auth/models';
import { useAuth } from '../../hooks';
import { loginValidationSchema } from './utils';

export function Login() {
  const { signIn } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<LoginAuthDTO>({
    resolver: yupResolver(loginValidationSchema),
  });

  const handleLogin = handleSubmit(async (data) => {
    await signIn(data);
  });

  return (
    <Form
      onSubmit={handleLogin}
      title="Entrar"
      buttonIsLoading={isSubmitting || isValidating}
      buttonTitle="Entrar"
    >
      <Stack spacing={4} px={8}>
      <Input
          placeholder="Digite aqui seu email"
          error={errors.email}
          type="email"
          {...register('email')}
        />
        <Input
          placeholder="Digite aqui sua senha"
          type="password"
          error={errors.password}
          {...register('password')}
        />
      </Stack>
      <Stack spacing={8} px={[10, 20]} textAlign="center">
        <Link to="/register">
          <Text color="blue.400">Ainda não tem uma conta?</Text>
        </Link>
      </Stack>
    </Form>
  );
}
