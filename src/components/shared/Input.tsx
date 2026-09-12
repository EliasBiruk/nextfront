import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    helperText, 
    error, 
    leftIcon, 
    rightIcon, 
    size = 'md', 
    fullWidth = true,
    className = '',
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const sizeStyles = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-5 text-base',
    };
    
    const iconPadding = leftIcon ? 'pl-10' : '';
    const rightIconPadding = rightIcon ? 'pr-10' : '';
    
    const inputStyles = `
      w-full ${fullWidth ? '' : 'w-auto'}
      rounded-[var(--joyedu-input-radius)]
      border border-[var(--joyedu-input-border)]
      bg-[var(--joyedu-bg-primary)]
      text-[var(--joyedu-text-primary)]
      placeholder:text-[var(--joyedu-text-muted)]
      transition-all duration-200
      focus:outline-none
      focus:border-[var(--joyedu-input-border-focus)]
      focus:ring-2
      focus:ring-[var(--joyedu-primary-500)]
      focus:ring-opacity-20
      disabled:opacity-50
      disabled:cursor-not-allowed
      ${error ? 'border-[var(--joyedu-error)] focus:border-[var(--joyedu-error)] focus:ring-[var(--joyedu-error-500)]' : ''}
      ${sizeStyles[size]}
      ${iconPadding}
      ${rightIconPadding}
      ${className}
    `;
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--joyedu-text-muted)] pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={inputStyles}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--joyedu-text-muted)] pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {helperText && !error && (
          <p className="mt-1 text-xs text-[var(--joyedu-text-muted)]">{helperText}</p>
        )}
        {error && (
          <p className="mt-1 text-xs text-[var(--joyedu-error)]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
