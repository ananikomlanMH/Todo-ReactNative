import React from 'react';
import { View, Text } from 'react-native';

interface BadgeProps {
  text: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  size?: 'small' | 'medium';
}

const Badge: React.FC<BadgeProps> = ({ 
  text, 
  variant = 'default',
  size = 'medium'
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100';
      case 'warning':
        return 'bg-yellow-100';
      case 'danger':
        return 'bg-red-100';
      case 'info':
        return 'bg-blue-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'success':
        return 'text-green-800';
      case 'warning':
        return 'text-yellow-800';
      case 'danger':
        return 'text-red-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  };


  return (
    <View className={`rounded-full ${getBackgroundColor()} ${size === 'small' ? 'px-2 py-0.5' : 'px-3 py-1'}`}>
      <Text className={`${getTextColor()} font-rubik-medium ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
        {text}
      </Text>
    </View>
  );
};

export default Badge;
