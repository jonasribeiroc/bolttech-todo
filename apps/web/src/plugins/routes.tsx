import { Route, Routes } from 'react-router-dom';
import { Login, Register } from '@src/modules/Auth/pages';
import { Projects } from '@src/modules/Project';

export type RouterType = {
  title: string;
  path: string;
  element: JSX.Element;
};

export const routes: RouterType[] = [
  {
    path: '',
    element: <Login />,
    title: 'Login',
  },
  {
    path: 'register',
    element: <Register />,
    title: 'Registrar',
  },
  {
    path: 'projects',
    element: <Projects />,
    title: 'Projects',
  },
];

export function AppRoutes() {
  const appRoutes = routes.map(({ path, title, element }: RouterType) => (
    <Route key={title} path={`/${path}`} element={element} />
  ));

  return <Routes>{appRoutes}</Routes>;
}
