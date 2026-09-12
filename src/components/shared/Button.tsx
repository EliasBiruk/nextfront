import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'warning' | 'info' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles: Record<string, string> = {
    primary: 'bg-[var(--joyedu-primary)] text-white hover:bg-[var(--joyedu-primary-hover)] focus:ring-[var(--joyedu-primary-500)]',
    secondary: 'bg-[var(--joyedu-secondary)] text-white hover:bg-[var(--joyedu-secondary-700)] focus:ring-[var(--joyedu-secondary-500)]',
    outline: 'border border-[var(--joyedu-border-300)] text-[var(--joyedu-text-primary)] hover:bg-[var(--joyedu-bg-tertiary)] focus:ring-[var(--joyedu-primary-500)]',
    ghost: 'text-[var(--joyedu-text-primary)] hover:bg-[var(--joyedu-bg-tertiary)] focus:ring-[var(--joyedu-primary-500)]',
    destructive: 'bg-[var(--joyedu-error)] text-white hover:bg-[var(--joyedu-error-700)] focus:ring-[var(--joyedu-error-500)]',
    success: 'bg-[var(--joyedu-success)] text-white hover:bg-[var(--joyedu-success-700)] focus:ring-[var(--joyedu-success-500)]',
    warning: 'bg-[var(--joyedu-warning)] text-white hover:bg-[var(--joyedu-warning-700)] focus:ring-[var(--joyedu-warning-500)]',
    info: 'bg-[var(--joyedu-info)] text-white hover:bg-[var(--joyedu-info-700)] focus:ring-[var(--joyedu-info-500)]',
    link: 'text-[var(--joyedu-primary)] hover:underline focus:ring-[var(--joyedu-primary-500)] bg-transparent',
  };
  
  const sizeStyles = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };
  
  const isDisabled = disabled || isLoading;
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : leftIcon && (
        <span className="mr-2">{leftIcon}</span>
      )}
      {children}
      {!isLoading && rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  );
}