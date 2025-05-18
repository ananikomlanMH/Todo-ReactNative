import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  error, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry,
  keyboardType,
  multiline,
  numberOfLines,
  ...rest 
}) => {
  return (
    <View className="mb-4">
      <Text className="font-rubik-medium text-gray-700 mb-1">{label}</Text>
      <TextInput
        className={`border rounded-md px-3 py-2 font-rubik outline-none focus:border-primary focus:border-2 ${
          multiline ? 'min-h-[100px] text-top' : 'h-12'
        } ${error ? 'border-red-500' : 'border-gray-300'}`}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        {...rest}
      />
      {error && <Text className="text-red-500 font-rubik text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default FormField;
