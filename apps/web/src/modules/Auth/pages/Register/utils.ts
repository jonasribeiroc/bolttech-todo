import * as yup from 'yup';

export const registerValidationSchema = yup
  .object({
    password: yup
      .string()
      .required('Senha é obrigatória')
      .min(6, 'A senha precisa ter no mínimo 6 caracteres')
      .max(20, 'A senha precisa ter no máximo 20 caracteres'),
    name: yup.string().required('Nome é obrigatório'),
    email: yup
      .string()
      .required('Email é obrigatório')
      .email(
        'Email inválido. Por favor, verifique o formato e tente novamente'
      ),
  })
  .required();
