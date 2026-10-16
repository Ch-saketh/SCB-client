import { DashboardMetrics, ManagedUser } from '../types/dashboard.types';

export const dashboardService = {
  async getMetrics(): Promise<DashboardMetrics> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      totalUsers: 128,
      activeSessions: 14,
      systemStatus: 'Online',
      pendingTasks: 3,
    };
  },

  async getManagedUsers(): Promise<ManagedUser[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
      { id: 'USR-001', username: 'admin', role: 'Admin', status: 'Active', lastLogin: '10 mins ago' },
      { id: 'USR-002', username: 'john_doe', role: 'User', status: 'Active', lastLogin: '1 hour ago' },
      { id: 'USR-003', username: 'sarah_connor', role: 'User', status: 'Active', lastLogin: 'Yesterday' },
      { id: 'USR-004', username: 'alex_mercer', role: 'User', status: 'Pending', lastLogin: 'Never' },
      { id: 'USR-005', username: 'test_guest', role: 'User', status: 'Inactive', lastLogin: '3 weeks ago' },
    ];
  },
};
