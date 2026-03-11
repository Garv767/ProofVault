import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm'
    };

    const variantClasses = {
      default: 'border border-gray-200 text-gray-700 bg-gray-50 hover:bg-gray-100',
      primary: 'bg-gray-900 text-white hover:bg-gray-800',
      secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-150',
      outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-md font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
