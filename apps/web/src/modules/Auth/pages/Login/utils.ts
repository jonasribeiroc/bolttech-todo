import * as yup from 'yup';

export const loginValidationSchema = yup
  .object({
    email: yup
      .string()
      .required('Email é obrigatório'),
    password: yup
      .string()
      .required('Senha é obrigatória')
      .min(6, 'A senha precisa ter no mínimo 6 caracteres')
      .max(20, 'A senha precisa ter no máximo 20 caracteres'),
  })
  .required();
