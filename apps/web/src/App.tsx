import { ChakraProvider } from '@chakra-ui/react';
import { useLocation } from 'react-router';
import { Layout } from './components/Layout';
import { AuthProvider } from '@src/modules/Auth';
import { AppRoutes } from './plugins/routes';
import { theme } from './styles/theme';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

export function App() {
  const { pathname } = useLocation();
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        {pathname === '/' || pathname === '/register' ? 
        (<AppRoutes />) : (
          <Layout>
            <AppRoutes />
          </Layout>
        )}
      </ChakraProvider>
    </AuthProvider>
  );
}
