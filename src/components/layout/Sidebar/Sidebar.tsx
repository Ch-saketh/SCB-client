import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routes/paths';
import './Sidebar.css';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', path: ROUTE_PATHS.DASHBOARD.ROOT, icon: '📊' },
  { label: 'User Management', path: ROUTE_PATHS.DASHBOARD.USERS, icon: '👥' },
  { label: 'System Analytics', path: '#analytics', icon: '📈' },
  { label: 'Configuration', path: '#settings', icon: '⚙️' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="app-sidebar">
      <nav className="flex flex-col gap-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === ROUTE_PATHS.DASHBOARD.ROOT}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
