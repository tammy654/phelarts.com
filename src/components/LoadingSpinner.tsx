import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = '#016952' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300`}
        style={{ 
          borderTopColor: color,
          borderRightColor: color 
        }}
      />
    </div>
  );
};

export default LoadingSpinner;