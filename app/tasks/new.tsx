import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import TaskForm from '../../components/tasks/TaskForm';

export default function NewTask() {
  const router = useRouter();
  const params = useLocalSearchParams<{ personnelId?: string }>();
  const personnelId = params.personnelId ? parseInt(params.personnelId) : undefined;

  return (
    <View className="flex-1 bg-white pt-5">
      <TaskForm personnelId={personnelId} onSuccess={() => router.back()} />
    </View>
  );
}
