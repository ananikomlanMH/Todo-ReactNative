import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldProps {
  label: string;
  options: Option[];
  value?: string | number;
  onValueChange: (value: string | number) => void;
  placeholder?: string;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onValueChange,
  placeholder = 'Sélectionner une option',
  error,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  return (
    <View className="mb-4">
      <Text className="font-rubik-medium text-gray-700 mb-1">{label}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className={`border rounded-md px-3 h-12 flex-row items-center justify-between ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <Text className={`font-rubik ${!selectedOption ? 'text-gray-400' : 'text-gray-800'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#6B7280" />
      </TouchableOpacity>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black bg-opacity-50">
          <View className="bg-white rounded-t-lg p-4 h-1/2">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-rubik-medium text-lg">Sélectionner {label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`p-3 border-b border-gray-200 ${
                    item.value === value ? 'bg-blue-50' : ''
                  }`}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text className={`font-rubik ${item.value === value ? 'text-primary font-rubik-medium' : ''}`}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SelectField;
