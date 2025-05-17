import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// Définir les types d'icônes Ionicons acceptés
type IoniconsName = 'add' | 'remove' | 'close' | 'checkmark' | 'menu' | 'search' | 'arrow-back' | 
  'arrow-forward' | 'arrow-up' | 'arrow-down' | 'chevron-back' | 'chevron-forward' | 
  'chevron-up' | 'chevron-down' | 'calendar' | 'time' | 'person' | 'people' | 'mail' | 
  'call' | 'settings' | 'home' | 'heart' | 'star' | 'trash' | 'list' | 'alert' | 
  'information' | 'help' | 'refresh' | 'save' | 'create' | 'edit' | 'share' | 'download' | 
  'upload' | 'cloud' | 'camera' | 'image' | 'bookmark' | 'flag' | 'pin' | 'location' | 
  'navigate' | 'chatbox' | 'chatbubble' | 'notifications' | 'warning' | 'checkmark-circle' | 
  'close-circle' | 'alert-circle' | 'information-circle' | 'help-circle' | 'add-circle' | 
  'remove-circle' | 'eye' | 'eye-off' | 'lock' | 'unlock' | 'key' | 'link' | 'attach' | 
  'copy' | 'cut' | 'clipboard' | 'document' | 'folder' | 'funnel' | 'options' | 'more' | 
  'ellipsis-vertical' | 'ellipsis-horizontal' | 'calendar-outline' | 'person-outline' | 
  'people-outline' | 'time-outline' | 'alarm-outline';

interface CardProps {
  title?: string;
  children: ReactNode;
  onPress?: () => void;
  footer?: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'accent';
  accentColor?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  titleIcon?: IoniconsName;
  titleVariant?: 'default' | 'centered' | 'accent';
}

const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  onPress, 
  footer, 
  variant = 'default',
  accentColor = '#4F46E5',
  rounded = 'lg',
  titleIcon,
  titleVariant = 'default'
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  const getRoundedClass = () => {
    switch (rounded) {
      case 'none': return '';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-lg';
      case 'xl': return 'rounded-xl';
      default: return 'rounded-lg';
    }
  };

  const getCardClass = () => {
    let baseClass = `overflow-hidden mb-4 ${getRoundedClass()}`;
    
    switch (variant) {
      case 'elevated':
        baseClass += ' bg-white';
        break;
      case 'outlined':
        baseClass += ' bg-white border border-gray-200';
        break;
      case 'accent':
        baseClass += ' bg-white border-l-4 border-primary';
        break;
      default: // default
        baseClass += ' bg-white';
    }
    
    return baseClass;
  };

  const getTitleClass = () => {
    let baseClass = 'px-4 py-3 border-b border-gray-200';
    
    switch (titleVariant) {
      case 'centered':
        baseClass += ' items-center';
        break;
      case 'accent':
        baseClass += ' bg-primary';
        break;
      default:
        baseClass += ' bg-gray-50';
    }
    
    return baseClass;
  };

  const getTitleTextClass = () => {
    let baseClass = 'font-rubik-medium text-lg';
    
    if (titleVariant === 'accent') {
      baseClass += ' text-white';
    } else {
      baseClass += ' text-gray-800';
    }
    
    return baseClass;
  };

  if (variant === 'accent') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={onPress ? 0.9 : 1}
        className={`overflow-hidden mb-4 ${getRoundedClass()} bg-white border-l-4 border-primary`}
        style={{ borderLeftColor: accentColor }}
      >
        {title && (
          <View className={getTitleClass()}>
            <View className="flex-row items-center">
              {titleIcon && <Ionicons name={titleIcon} size={20} color={titleVariant === 'accent' ? 'white' : '#4F46E5'} style={{ marginRight: 8 }} />}
              <Text className={getTitleTextClass()}>{title}</Text>
            </View>
          </View>
        )}
        <View className="p-4">{children}</View>
        {footer && (
          <View className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            {footer}
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <CardComponent
      onPress={onPress}
      className={getCardClass()}
      activeOpacity={0.9}
    >
      {title && (
        <View className={getTitleClass()}>
          <View className="flex-row items-center">
            {titleIcon && <Ionicons name={titleIcon} size={20} color={titleVariant === 'accent' ? 'white' : '#4F46E5'} style={{ marginRight: 8 }} />}
            <Text className={getTitleTextClass()}>{title}</Text>
          </View>
        </View>
      )}
      <View className="p-4">{children}</View>
      {footer && (
        <View className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          {footer}
        </View>
      )}
    </CardComponent>
  );
};

export default Card;
