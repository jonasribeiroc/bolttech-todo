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

  function logout() {
    destroyCookie(undefined, 'token');
    navigate('/');
  }

  async function signIn(data: LoginAuthDTO) {
    try {
      const dataToken = await login(data);
      setToken(dataToken);

      navigate('/projects', { replace: true });
    } catch (error) {
      console.log('ERROR!', error);
    }
  }

  async function signUp(data: RegisterAuthDTO) {
    try {
      await register(data);
    } catch (error) {
      console.log('ERROR!', error);
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
