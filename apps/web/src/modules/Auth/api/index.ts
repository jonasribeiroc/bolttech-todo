import { AxiosRequestConfig } from 'axios';
import environment from '@src/environments/environment';
import axios from '@src/plugins/axios';
import { LoginAuthDTO, RegisterAuthDTO } from '../models';

const api = axios({ baseURL: environment.baseURL });

export async function login(
  credentials: LoginAuthDTO,
  config?: AxiosRequestConfig | undefined
): Promise<string> {
  const response = await api.post('/auth/login', credentials, {...config});

  return response.data;
}

export async function register(
  data: RegisterAuthDTO,
  config?: AxiosRequestConfig | undefined
): Promise<string> {
  const response = await api.post('/auth/register', data, config);

  return response.data;
}

