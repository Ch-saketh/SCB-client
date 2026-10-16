import React, { useEffect, useState } from 'react';
import { Loader } from '@/components/feedback/Loader/Loader';
import { MetricCard } from '@/features/dashboard/components/MetricCard';
import { UsersTable } from '@/features/dashboard/components/UsersTable';
import { dashboardService } from '@/features/dashboard/services/dashboardService';
import { DashboardMetrics, ManagedUser } from '@/features/dashboard/types/dashboard.types';

export const DashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [m, u] = await Promise.all([
          dashboardService.getMetrics(),
          dashboardService.getManagedUsers(),
        ]);
        setMetrics(m);
        setUsers(u);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <Loader size="lg" text="Loading dashboard data..." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      <div>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>Admin Dashboard</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
          Monitor system throughput, active user sessions, and operational state.
        </p>
      </div>

      {/* Metrics Row */}
      {metrics && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--spacing-4)',
          }}
        >
          <MetricCard
            title="Total Users"
            value={metrics.totalUsers}
            icon="👥"
            change="+12% this month"
            isPositive
          />
          <MetricCard
            title="Active Sessions"
            value={metrics.activeSessions}
            icon="⚡"
            change="Real-time"
            isPositive
          />
          <MetricCard
            title="System Status"
            value={metrics.systemStatus}
            icon="🟢"
          />
          <MetricCard
            title="Pending Tasks"
            value={metrics.pendingTasks}
            icon="📋"
            change="-2 from yesterday"
            isPositive
          />
        </div>
      )}

      {/* User Management Section */}
      <UsersTable users={users} />
    </div>
  );
};
