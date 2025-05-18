import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import TaskCard from '../../components/tasks/TaskCard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { personnelApi, taskApi } from '../../utils/api';
import { Personnel, Task, TaskFilter } from '../../utils/types';

export default function PersonnelDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [personnel, setPersonnel] = useState<Personnel | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');

  useEffect(() => {
    loadPersonnelWithTasks();
  }, [id]);

  const loadPersonnelWithTasks = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const personnelData = await personnelApi.getWithTasks(parseInt(id));
      setPersonnel(personnelData);

      // Charger les tâches séparément pour avoir plus de détails
      const tasksData = await taskApi.getByPersonnel(parseInt(id));
      setTasks(tasksData);
    } catch (error) {
      console.error('Erreur lors du chargement des détails du personnel:', error);
      Alert.alert('Erreur', 'Impossible de charger les détails du personnel');
    } finally {
      setLoading(false);
    }
  };

  // handleDelete function moved to AppBar dropdown menu in _layout.tsx

  const getFilteredTasks = () => {
    if (filter === 'completed') {
      return tasks.filter(task => task.realisee);
    } else if (filter === 'pending') {
      return tasks.filter(task => !task.realisee);
    }
    return tasks;
  };

  const filteredTasks = getFilteredTasks();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#287aea" />
        <Text className="font-rubik mt-4 text-gray-600">Chargement des détails...</Text>
      </View>
    );
  }

  if (!personnel) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 p-4">
        <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
        <Text className="font-rubik-medium text-lg text-gray-800 mt-4">
          Personnel non trouvé
        </Text>
        <Text className="font-rubik text-gray-600 text-center mt-2 mb-6">
          Le membre du personnel que vous recherchez n'existe pas ou a été supprimé.
        </Text>
        <Button title="Retour" onPress={() => router.back()} variant="primary" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="">
        {/* Informations du personnel */}
        <Card>
          <View className="flex-row items-center mb-4">
            <View className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mr-4">
              <Text className="text-white font-rubik-bold text-xl">
                {personnel.prenom.charAt(0)}{personnel.nom.charAt(0)}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="font-rubik-bold text-xl text-gray-800">
                {personnel.prenom} {personnel.nom}
              </Text>
              <Text className="font-rubik text-gray-600">
                {personnel.poste || 'Poste non spécifié'}
              </Text>
            </View>
          </View>

          <View className="border-t border-gray-200 pt-4 mt-2">
            <View className="flex-row items-center mb-3">
              <Ionicons name="mail-outline" size={20} color="#6B7280" />
              <Text className="font-rubik text-gray-700 ml-3">{personnel.email}</Text>
            </View>
            {personnel.telephone && (
              <View className="flex-row items-center mb-3">
                <Ionicons name="call-outline" size={20} color="#6B7280" />
                <Text className="font-rubik text-gray-700 ml-3">{personnel.telephone}</Text>
              </View>
            )}
            {personnel.departement && (
              <View className="flex-row items-center mb-3">
                <Ionicons name="business-outline" size={20} color="#6B7280" />
                <Text className="font-rubik text-gray-700 ml-3">{personnel.departement}</Text>
              </View>
            )}
          </View>

          {/* Action buttons moved to dropdown menu in AppBar */}
        </Card>

        {/* Tâches du personnel */}
        <View className="">
          {/* Filtres */}
          <View className="flex-row mb-4 bg-white shadow-sm border-b border-gray-100">
            <TouchableOpacity
              className={`flex-1 py-3 ${filter === 'all' ? 'border-b-2 border-primary' : ''}`}
              onPress={() => setFilter('all')}
            >
              <Text className={`font-rubik text-center ${filter === 'all' ? 'text-primary font-rubik-medium' : 'text-gray-700'}`}>
                Toutes ({tasks.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-3 ${filter === 'pending' ? 'border-b-2 border-primary' : ''}`}
              onPress={() => setFilter('pending')}
            >
              <Text className={`font-rubik text-center ${filter === 'pending' ? 'text-primary font-rubik-medium' : 'text-gray-700'}`}>
                À faire ({tasks.filter(t => !t.realisee).length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-3 ${filter === 'completed' ? 'border-b-2 border-primary' : ''}`}
              onPress={() => setFilter('completed')}
            >
              <Text className={`font-rubik text-center ${filter === 'completed' ? 'text-primary font-rubik-medium' : 'text-gray-700'}`}>
                Terminées ({tasks.filter(t => t.realisee).length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Liste des tâches */}
          <View className='p-4'>
            {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} onUpdate={loadPersonnelWithTasks} />
            ))
          ) : (
            <Card>
              <View className="py-6 items-center">
                <Ionicons name="list" size={32} color="#D1D5DB" />
                <Text className="font-rubik-medium text-gray-500 mt-3 mb-1">
                  Aucune tâche {filter === 'completed' ? 'terminée' : filter === 'pending' ? 'en attente' : ''}
                </Text>
                <Text className="font-rubik text-gray-400 text-center">
                  {filter === 'all'
                    ? "Ajoutez une nouvelle tâche pour ce membre du personnel"
                    : "Changez de filtre ou ajoutez une nouvelle tâche"}
                </Text>
              </View>
            </Card>
          )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
