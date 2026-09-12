import { ReactNode } from 'react';
import ProgressBar from '@/components/shared/ProgressBar';

interface ProgressCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  progress?: number;
  progressColor?: 'blue' | 'green' | 'yellow' | 'red';
  children?: ReactNode;
}

const colorStyles = {
  blue: 'from-blue-500 to-blue-600 text-white border-blue-200',
  green: 'from-green-500 to-green-600 text-white border-green-200',
  purple: 'from-purple-500 to-purple-600 text-white border-purple-200',
  orange: 'from-orange-500 to-orange-600 text-white border-orange-200',
  red: 'from-red-500 to-red-600 text-white border-red-200',
};

const bgColorStyles = {
  blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-900',
  green: 'from-green-50 to-green-100 border-green-200 text-green-900',
  purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-900',
  orange: 'from-orange-50 to-orange-100 border-orange-200 text-orange-900',
  red: 'from-red-50 to-red-100 border-red-200 text-red-900',
};

export default function ProgressCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color, 
  progress,
  progressColor = 'blue',
  children 
}: ProgressCardProps) {
  const isGradient = !progress && !children;
  
  return (
    <div className={`rounded-lg border p-4 ${
      isGradient 
        ? `bg-gradient-to-br ${colorStyles[color]} border-0` 
        : `bg-gradient-to-br ${bgColorStyles[color]}`
    }`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-sm font-medium ${isGradient ? 'text-white' : ''}`}>
          {title}
        </span>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className={`text-2xl font-bold mb-2 ${isGradient ? '' : ''}`}>
        {value}
      </div>
      {subtitle && (
        <div className={`text-xs ${isGradient ? 'text-white opacity-80' : ''}`}>
          {subtitle}
        </div>
      )}
      {progress && (
        <div className="mt-2">
          <ProgressBar progress={progress} color={progressColor} />
        </div>
      )}
      {children}
    </div>
  );
}