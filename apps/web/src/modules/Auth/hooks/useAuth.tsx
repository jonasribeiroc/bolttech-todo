import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useNavigate } from 'react-router';
import { login, register} from '@src/modules/Auth/api';
import { IUser, LoginAuthDTO, RegisterAuthDTO } from '@src/modules/Auth/models';
import jwtDecode from 'jwt-decode';
import { useToast } from '@chakra-ui/react';

export type AuthContextData = {
  signIn: (credentials: LoginAuthDTO) => Promise<void>;
  signUp: (data: RegisterAuthDTO) => Promise<void>;
  logout: () => void;
  user: IUser
  isAuthenticated: boolean;
};

export type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const cookies = parseCookies();
  const navigate = useNavigate();
  const [token, setToken] = useState<string>(cookies['token']);
  const [user, setUser] = useState<IUser>({} as IUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const toast = useToast();

  function logout() {
    destroyCookie(undefined, 'token');
    setIsAuthenticated(false);
    navigate('/');
  }

  async function signIn(data: LoginAuthDTO) {
    try {
      const dataToken = await login(data);
      setToken(dataToken);
      navigate('/projects');
    } catch (error: any) {
      toast({ title: error.response.data.message, status: 'error' });
    }
  }

  async function signUp(data: RegisterAuthDTO) {
    try {
      const dataToken = await register(data);
      setToken(dataToken);
      navigate('/projects');
      toast({ title: 'Account created.', status: 'success' });
    } catch (error: any) {
      toast({ title: error.response.data.message, status: 'error' });
    }
  }

  useEffect(() => {
    if (token) {
      setCookie(undefined, 'token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      const { _id, name, email } = jwtDecode<IUser>(token);
      setUser({ _id, name, email });
      setIsAuthenticated(true);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) navigate('/projects')
  }, [isAuthenticated, navigate]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, signUp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
