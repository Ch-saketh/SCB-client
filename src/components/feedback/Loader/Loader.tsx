import React from 'react';
import './Loader.css';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  text,
  className = '',
}) => {
  return (
    <div className={`loader-container ${className}`}>
      <div className={`spinner spinner-${size}`} />
      {text && <p className="text-sm text-muted">{text}</p>}
    </div>
  );
};
