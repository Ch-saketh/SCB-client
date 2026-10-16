import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header/Header';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';

export const DashboardLayout: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            padding: 'var(--spacing-8)',
            backgroundColor: 'var(--color-bg-app)',
            overflowY: 'auto',
          }}
        >
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
