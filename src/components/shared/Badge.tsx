import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  dot?: boolean;
}

export default function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  dot = false
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-[var(--joyedu-bg-tertiary)] text-[var(--joyedu-text-primary)] border border-[var(--joyedu-border-200)]',
    success: 'bg-[var(--joyedu-success-bg)] text-[var(--joyedu-success-text)] border border-[var(--joyedu-success-200)]',
    warning: 'bg-[var(--joyedu-warning-bg)] text-[var(--joyedu-warning-text)] border border-[var(--joyedu-warning-200)]',
    danger: 'bg-[var(--joyedu-error-bg)] text-[var(--joyedu-error-text)] border border-[var(--joyedu-error-200)]',
    info: 'bg-[var(--joyedu-info-bg)] text-[var(--joyedu-info-text)] border border-[var(--joyedu-info-200)]',
    primary: 'bg-[var(--joyedu-primary-subtle)] text-[var(--joyedu-primary-700)] border border-[var(--joyedu-primary-200)]',
    secondary: 'bg-[var(--joyedu-bg-tertiary)] text-[var(--joyedu-text-secondary)] border border-[var(--joyedu-border-200)]',
  };
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };
  
  if (dot) {
    const dotColor = variantStyles[variant].split(' ')[0];
    return (
      <span className={`inline-flex items-center ${className}`}>
        <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
        {children && <span className={`ml-2 ${sizeStyles[size]} ${variantStyles[variant]}`}>{children}</span>}
      </span>
    );
  }
  
  return (
    <span className={`inline-flex items-center rounded-[var(--joyedu-badge-radius)] font-[var(--joyedu-badge-font-weight)] ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
}