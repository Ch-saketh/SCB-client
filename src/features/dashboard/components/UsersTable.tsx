import React from 'react';
import { Badge } from '@/components/common/Badge/Badge';
import { Card } from '@/components/common/Card/Card';
import { ManagedUser } from '../types/dashboard.types';

interface UsersTableProps {
  users: ManagedUser[];
}

export const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const getStatusVariant = (status: ManagedUser['status']) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Inactive':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <Card
      header={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>
            User Management Directory
          </h3>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            {users.length} Total Users
          </span>
        </div>
      }
    >
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
              <th style={{ padding: 'var(--spacing-3)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase' }}>
                User ID
              </th>
              <th style={{ padding: 'var(--spacing-3)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase' }}>
                Username
              </th>
              <th style={{ padding: 'var(--spacing-3)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase' }}>
                Role
              </th>
              <th style={{ padding: 'var(--spacing-3)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase' }}>
                Status
              </th>
              <th style={{ padding: 'var(--spacing-3)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase' }}>
                Last Login
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                style={{
                  borderBottom: '1px solid var(--color-border)',
                  transition: 'background-color var(--transition-fast)',
                }}
              >
                <td style={{ padding: 'var(--spacing-3)', fontFamily: 'var(--font-family-mono)', fontSize: 'var(--font-size-xs)' }}>
                  {u.id}
                </td>
                <td style={{ padding: 'var(--spacing-3)', fontWeight: 600 }}>
                  {u.username}
                </td>
                <td style={{ padding: 'var(--spacing-3)' }}>
                  <Badge variant={u.role === 'Admin' ? 'danger' : 'info'}>
                    {u.role}
                  </Badge>
                </td>
                <td style={{ padding: 'var(--spacing-3)' }}>
                  <Badge variant={getStatusVariant(u.status)}>
                    {u.status}
                  </Badge>
                </td>
                <td style={{ padding: 'var(--spacing-3)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  {u.lastLogin || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
