import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IoniconsName } from '../../utils/iconTypes';



interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'accent';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: IoniconsName;
  iconPosition?: 'left' | 'right';
  rounded?: boolean;
  elevated?: boolean;
  outline?: boolean;
  className?: string; // Ajout de la propriété className
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  rounded = false,
  elevated = true,
  outline = false,
  className = '',
}) => {
  const getButtonClass = () => {
    let baseClass = 'flex flex-row justify-center items-center';
    
    // Border radius
    if (rounded) {
      baseClass += ' rounded-full';
    } else {
      baseClass += ' rounded-xl';
    }
    
    // Variant classes
    if (outline) {
      baseClass += ' border-2';
      switch (variant) {
        case 'primary':
          baseClass += ' border-primary bg-transparent';
          break;
        case 'secondary':
          baseClass += ' border-secondary bg-transparent';
          break;
        case 'danger':
          baseClass += ' border-danger bg-transparent';
          break;
        case 'success':
          baseClass += ' border-success bg-transparent';
          break;
        case 'warning':
          baseClass += ' border-warning bg-transparent';
          break;
        case 'info':
          baseClass += ' border-info bg-transparent';
          break;
        case 'accent':
          baseClass += ' border-accent bg-transparent';
          break;
        default:
          baseClass += ' border-gray-300 bg-transparent';
      }
    } else {
      switch (variant) {
        case 'primary':
          baseClass += ' bg-primary';
          break;
        case 'secondary':
          baseClass += ' bg-secondary';
          break;
        case 'danger':
          baseClass += ' bg-danger';
          break;
        case 'success':
          baseClass += ' bg-success';
          break;
        case 'warning':
          baseClass += ' bg-warning';
          break;
        case 'info':
          baseClass += ' bg-info';
          break;
        case 'accent':
          baseClass += ' bg-accent';
          break;
        default:
          baseClass += ' bg-gray-200';
      }
    }
    
    // Size classes
    if (size === 'small') {
      baseClass += ' px-3 py-1.5';
    } else if (size === 'medium') {
      baseClass += ' px-4 py-2.5';
    } else if (size === 'large') {
      baseClass += ' px-6 py-3.5';
    }
    
    // Width class
    if (fullWidth) {
      baseClass += ' w-full';
    }
    
    // Elevation
    if (elevated && !outline && !disabled) {
      baseClass += ' shadow-md';
    }
    
    // Disabled class
    if (disabled) {
      baseClass += ' opacity-50';
    }
    
    return baseClass;
  };
  
  const getTextClass = () => {
    let textClass = 'font-rubik-medium text-center';
    
    // Variant text color
    if (outline) {
      switch (variant) {
        case 'primary':
          textClass += ' text-primary';
          break;
        case 'secondary':
          textClass += ' text-secondary';
          break;
        case 'danger':
          textClass += ' text-danger';
          break;
        case 'success':
          textClass += ' text-success';
          break;
        case 'warning':
          textClass += ' text-warning';
          break;
        case 'info':
          textClass += ' text-info';
          break;
        case 'accent':
          textClass += ' text-accent';
          break;
        default:
          textClass += ' text-gray-700';
      }
    } else {
      // For non-outline buttons, most variants use white text
      if (['primary', 'secondary', 'danger', 'success', 'warning', 'info', 'accent'].includes(variant)) {
        textClass += ' text-white';
      } else {
        textClass += ' text-gray-800';
      }
    }
    
    // Size text
    if (size === 'small') {
      textClass += ' text-sm';
    } else if (size === 'medium') {
      textClass += ' text-base';
    } else if (size === 'large') {
      textClass += ' text-lg';
    }
    
    return textClass;
  };
  
  const getIconSize = () => {
    if (size === 'small') return 16;
    if (size === 'medium') return 18;
    return 20; // large
  };
  
  const getIconColor = () => {
    if (outline) {
      switch (variant) {
        case 'primary': return '#4F46E5';
        case 'secondary': return '#10B981';
        case 'danger': return '#EF4444';
        case 'success': return '#10B981';
        case 'warning': return '#F59E0B';
        case 'info': return '#3B82F6';
        case 'accent': return '#F97316';
        default: return '#6B7280';
      }
    } else {
      return '#FFFFFF';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${getButtonClass()} ${className}`}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={outline ? getIconColor() : '#fff'} />
      ) : (
        <View className="flex-row items-center justify-center space-x-2">
          {icon && iconPosition === 'left' && (
            <Ionicons name={icon} size={getIconSize()} color={getIconColor()} />
          )}
          <Text className={getTextClass()}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Ionicons name={icon} size={getIconSize()} color={getIconColor()} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
