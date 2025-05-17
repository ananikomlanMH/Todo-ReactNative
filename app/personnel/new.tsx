import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import PersonnelForm from '../../components/personnel/PersonnelForm';

export default function NewPersonnel() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <PersonnelForm onSuccess={() => router.back()} />
    </View>
  );
}
