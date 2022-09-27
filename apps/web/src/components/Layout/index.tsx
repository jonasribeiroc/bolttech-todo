import React, { ReactNode } from 'react';

import { Navbar } from '../Navbar';

interface ILayoutProps {
  children: ReactNode;
}

export function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
