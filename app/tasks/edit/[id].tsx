import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import TaskForm from '../../../components/tasks/TaskForm';
import { taskApi } from '../../../utils/api';
import { Task } from '../../../utils/types';

export default function EditTask() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTask();
  }, [id]);

  const loadTask = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const data = await taskApi.getById(parseInt(id));
      setTask(data);
    } catch (error) {
      console.error('Erreur lors du chargement de la tâche:', error);
      Alert.alert('Erreur', 'Impossible de charger les données de la tâche');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#287aea" />
        <Text className="font-rubik mt-4 text-gray-600">Chargement des données...</Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 p-4">
        <Text className="font-rubik-medium text-lg text-gray-800 mb-4">
          Tâche non trouvée
        </Text>
        <Text className="font-rubik text-gray-600 text-center mb-6">
          La tâche que vous souhaitez modifier n'existe pas ou a été supprimée.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <TaskForm task={task} onSuccess={() => router.back()} />
    </View>
  );
}
