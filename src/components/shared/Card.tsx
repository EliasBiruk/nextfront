import { ReactNode, MouseEventHandler } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  variant?: 'default' | 'elevated' | 'outlined' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({ children, className = '', onClick, variant = 'default', padding = 'md' }: CardProps) {
  const variantStyles = {
    default: 'bg-[var(--joyedu-card-bg)] border border-[var(--joyedu-card-border)] shadow-[var(--joyedu-card-shadow)]',
    elevated: 'bg-[var(--joyedu-card-bg)] border border-[var(--joyedu-card-border)] shadow-[var(--joyedu-shadow-md)]',
    outlined: 'bg-[var(--joyedu-card-bg)] border border-[var(--joyedu-border-300)]',
    flat: 'bg-[var(--joyedu-card-bg)] border-0 shadow-none',
  };
  
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div 
      className={`rounded-[var(--joyedu-card-radius)] ${variantStyles[variant]} ${paddingStyles[padding]} ${onClick ? 'cursor-pointer hover:shadow-[var(--joyedu-shadow-md)] transition-shadow' : ''} ${className}`} 
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function CardBody({ children, className = '', padding = 'md' }: CardBodyProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  return <div className={`${paddingStyles[padding]} ${className}`}>{children}</div>;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function CardHeader({ children, className = '', padding = 'md' }: CardHeaderProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4 pb-0',
    md: 'p-6 pb-0',
    lg: 'p-8 pb-0',
  };
  return <div className={`${paddingStyles[padding]} ${className}`}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function CardTitle({ children, className = '', size = 'md' }: CardTitleProps) {
  const sizeStyles = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };
  return <h3 className={`font-semibold text-[var(--joyedu-text-primary)] mb-4 ${sizeStyles[size]} ${className}`}>{children}</h3>;
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return <p className={`text-sm text-[var(--joyedu-text-secondary)] mb-4 ${className}`}>{children}</p>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function CardFooter({ children, className = '', padding = 'md' }: CardFooterProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4 pt-0',
    md: 'p-6 pt-0',
    lg: 'p-8 pt-0',
  };
  return <div className={`${paddingStyles[padding]} flex items-center ${className}`}>{children}</div>;
}