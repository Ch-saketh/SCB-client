import React, { ReactNode } from 'react';
import './Alert.css';

interface AlertProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  icon?: ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  icon,
  className = '',
}) => {
  return (
    <div className={`alert alert-${variant} ${className}`} role="alert">
      {icon && <div className="alert-icon">{icon}</div>}
      <div className="alert-content">{children}</div>
    </div>
  );
};
