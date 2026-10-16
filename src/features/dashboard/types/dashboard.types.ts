export interface DashboardMetrics {
  totalUsers: number;
  activeSessions: number;
  systemStatus: 'Online' | 'Degraded' | 'Offline';
  pendingTasks: number;
}

export interface ManagedUser {
  id: string;
  username: string;
  role: 'User' | 'Admin';
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin?: string;
}
