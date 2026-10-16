import React, { ReactNode } from 'react';
import { Header } from '@/components/layout/Header/Header';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, padding: 'var(--spacing-8) 0' }}>
        <div className="container">{children}</div>
      </main>
    </div>
  );
};
