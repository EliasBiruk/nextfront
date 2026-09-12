import { SelectHTMLAttributes, ReactNode, forwardRef } from 'react';

interface SelectProps {
  label?: string;
  helperText?: string;
  error?: string;
  inputSize?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  options: { value: string; label: string; disabled?: boolean }[];
  className?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  name?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    helperText, 
    error, 
    inputSize = 'md', 
    fullWidth = true,
    options,
    className = '',
    id,
    ...props 
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    
    const sizeStyles: Record<string, string> = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-5 text-base',
    };
    
    const selectStyles = `
      w-full ${fullWidth ? '' : 'w-auto'}
      rounded-[var(--joyedu-input-radius)]
      border border-[var(--joyedu-input-border)]
      bg-[var(--joyedu-bg-primary)]
      text-[var(--joyedu-text-primary)]
      transition-all duration-200
      focus:outline-none
      focus:border-[var(--joyedu-input-border-focus)]
      focus:ring-2
      focus:ring-[var(--joyedu-primary-500)]
      focus:ring-opacity-20
      disabled:opacity-50
      disabled:cursor-not-allowed
      ${error ? 'border-[var(--joyedu-error)] focus:border-[var(--joyedu-error)] focus:ring-[var(--joyedu-error-500)]' : ''}
      ${sizeStyles[inputSize]}
      ${className}
    `;
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label 
            htmlFor={selectId}
            className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={selectStyles}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
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

Select.displayName = 'Select';

export default Select;
