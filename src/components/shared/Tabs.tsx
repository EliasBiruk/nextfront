import { ReactNode, useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Tabs({ 
  tabs, 
  defaultTab, 
  variant = 'default', 
  size = 'md',
  className = '' 
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const variantStyles = {
    default: {
      container: 'border-b border-[var(--joyedu-border-200)]',
      tab: 'border-b-2 border-transparent',
      active: 'border-[var(--joyedu-primary)] text-[var(--joyedu-primary)]',
      inactive: 'text-[var(--joyedu-text-secondary)] hover:text-[var(--joyedu-text-primary)]',
    },
    pills: {
      container: 'bg-[var(--joyedu-bg-tertiary)] p-1 rounded-lg inline-flex',
      tab: 'rounded-md',
      active: 'bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)] shadow-sm',
      inactive: 'text-[var(--joyedu-text-secondary)] hover:text-[var(--joyedu-text-primary)]',
    },
    underline: {
      container: '',
      tab: 'border-b-2 border-transparent',
      active: 'border-[var(--joyedu-primary)] text-[var(--joyedu-primary)]',
      inactive: 'text-[var(--joyedu-text-secondary)] hover:text-[var(--joyedu-text-primary)]',
    },
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className={`${variantStyles[variant].container} flex gap-1`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActiveTab(tab.id)}
            disabled={tab.disabled}
            className={`
              flex items-center gap-2 font-medium transition-all duration-200
              ${variantStyles[variant].tab}
              ${sizeStyles[size]}
              ${activeTab === tab.id 
                ? variantStyles[variant].active 
                : variantStyles[variant].inactive
              }
              ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTabData?.content}
      </div>
    </div>
  );
}
