import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TaskCard from '../../../components/tasks/TaskCard';
import Button from '../../../components/ui/Button';
import { personnelApi, taskApi } from '../../../utils/api';
import { Personnel, Task, TaskFilter } from '../../../utils/types';

export default function TaskList() {
  const router = useRouter();
  const params = useLocalSearchParams<{ filter?: string }>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<TaskFilter>(
    params.filter === 'completed' ? 'completed' : 
    params.filter === 'pending' ? 'pending' : 'all'
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedPersonnelId, setSelectedPersonnelId] = useState<number | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  // Refresh data when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const filterTasks = useCallback(() => {
    let filtered = [...tasks];

    // Application du filtre de statut (terminée/en cours)
    if (filter === 'completed') {
      filtered = filtered.filter(task => task.realisee);
    } else if (filter === 'pending') {
      filtered = filtered.filter(task => !task.realisee);
    }

    // Application du filtre par membre du personnel
    if (selectedPersonnelId) {
      filtered = filtered.filter(task => task.personnelId === selectedPersonnelId);
    }

    // Application du filtre de recherche textuelle
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        task => 
          task.titre.toLowerCase().includes(query) || 
          (task.description && task.description.toLowerCase().includes(query))
      );
    }

    setFilteredTasks(filtered);
  }, [searchQuery, filter, selectedPersonnelId, tasks]);

  useEffect(() => {
    filterTasks();
  }, [filterTasks]);

  const loadData = async () => {
    setLoading(true);
    try {
      const tasksData = await taskApi.getAll();
      setTasks(tasksData);
      const personnelData = await personnelApi.getAll();
      setPersonnel(personnelData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#287aea" />
        <Text className="font-rubik mt-4 text-gray-600">Chargement des tâches...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 bg-white shadow-sm">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-2 font-rubik text-gray-800 outline-none"
            placeholder="Rechercher une tâche..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>

      </View>

      <View className="flex-row mb-4 bg-white shadow-sm border-b border-gray-100">
        <TouchableOpacity
          className={`flex-1 py-3 ${filter === 'all' ? 'border-b-2 border-primary' : ''}`}
          onPress={() => setFilter('all')}
        >
          <Text className={`font-rubik text-center ${filter === 'all' ? 'text-primary font-rubik-medium' : 'text-gray-700'}`}>
            Toutes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 ${filter === 'pending' ? 'border-b-2 border-primary' : ''}`}
          onPress={() => setFilter('pending')}
        >
          <Text className={`font-rubik text-center ${filter === 'pending' ? 'text-primary font-rubik-medium' : 'text-gray-700'}`}>
            À faire
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 ${filter === 'completed' ? 'border-b-2 border-primary' : ''}`}
          onPress={() => setFilter('completed')}
        >
          <Text className={`font-rubik text-center ${filter === 'completed' ? 'text-primary font-rubik-medium' : 'text-gray-700'}`}>
            Terminées
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => <TaskCard task={item} onUpdate={loadData} />}
        contentContainerClassName="p-4"
        ListEmptyComponent={
          <View className="py-8 items-center">
            <Ionicons name="list" size={48} color="#D1D5DB" />
            <Text className="font-rubik-medium text-gray-500 mt-4 mb-2">
              Aucune tâche trouvée
            </Text>
            <Text className="font-rubik text-gray-400 text-center mb-4">
              {searchQuery || selectedPersonnelId || filter !== 'all' 
                ? "Essayez de modifier vos filtres" 
                : "Ajoutez votre première tâche"}
            </Text>
            {!searchQuery && !selectedPersonnelId && filter === 'all' && (
              <Button
                title="Ajouter une tâche"
                onPress={() => router.push('/tasks/new')}
                variant="primary"
              />
            )}
          </View>
        }
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      <TouchableOpacity
        className="absolute bottom-6 right-6 h-14 w-14 rounded-full bg-primary shadow-lg items-center justify-center"
        onPress={() => router.push('/tasks/new')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
