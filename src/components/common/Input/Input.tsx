import React, { InputHTMLAttributes, forwardRef } from 'react';
import './Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, id, className = '', ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`input-wrapper ${className}`}>
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}
        <div className={`input-container ${error ? 'has-error' : ''}`}>
          {leftIcon && <span className="input-icon">{leftIcon}</span>}
          <input ref={ref} id={inputId} className="input-field" {...props} />
        </div>
        {error && <span className="input-error">{error}</span>}
        {!error && helperText && <span className="input-helper">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
