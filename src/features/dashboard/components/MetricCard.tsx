import React from 'react';
import { Card } from '@/components/common/Card/Card';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: string;
  change?: string;
  isPositive?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  change,
  isPositive = true,
}) => {
  return (
    <Card hoverable style={{ minWidth: '200px', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', fontWeight: 500 }}>
          {title}
        </span>
        {icon && <span style={{ fontSize: '1.25rem' }}>{icon}</span>}
      </div>
      <div style={{ marginTop: 'var(--spacing-2)', display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-2)' }}>
        <span style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700, color: 'var(--color-text-main)' }}>
          {value}
        </span>
        {change && (
          <span
            style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              color: isPositive ? 'var(--color-success)' : 'var(--color-danger)',
            }}
          >
            {change}
          </span>
        )}
      </div>
    </Card>
  );
};
