import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import TaskCard from '../../components/tasks/TaskCard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import { personnelApi, taskApi } from '../../utils/api';
import { Task } from '../../utils/types';

/**
 * Page d'accueil / Tableau de bord
 * Affiche une vue d'ensemble des statistiques et des tâches récentes
 */
export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPersonnel: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  });
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);

  /**
   * Charge les données du tableau de bord depuis l'API
   * Récupère les statistiques et les tâches récentes
   */
  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      // Charger les données du personnel
      const personnelData = await personnelApi.getAll();

      // Charger toutes les tâches
      const tasksData = await taskApi.getAll();

      // Calculer les statistiques
      const completedTasks = tasksData.filter(task => task.realisee);
      const pendingTasks = tasksData.filter(task => !task.realisee);

      setStats({
        totalPersonnel: personnelData.length,
        totalTasks: tasksData.length,
        completedTasks: completedTasks.length,
        pendingTasks: pendingTasks.length
      });

      // Récupérer les 5 tâches les plus récentes
      const sortedTasks = [...tasksData].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      }).slice(0, 5);

      setRecentTasks(sortedTasks);
    } catch (error) {
      console.error('Erreur lors du chargement des données du tableau de bord:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Refresh data when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadDashboardData();
    }, [loadDashboardData])
  );


  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="font-rubik-medium mt-4 text-text-secondary">Chargement du tableau de bord...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="bg-primary pt-5 pb-6 shadow-md">
          <View className="px-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-rubik-bold text-2xl text-white">Tableau de bord</Text>
              <View className="flex-row">
                <TouchableOpacity 
                  className="h-10 w-10 rounded-full bg-white/20 items-center justify-center mr-2"
                  onPress={() => alert('Les paramètres ne sont pas disponibles pour le moment.\nIls seront ajoutés dans une prochaine mise à jour.\n\nBy Anani Komlan')}
                >
                  <Ionicons name="settings-outline" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                  className="h-10 w-10 rounded-full bg-white/20 items-center justify-center"
                  onPress={() => router.push('/personnel')}
                >
                  <Ionicons name="person" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="bg-white/10 p-4 rounded-xl mb-2">
              <View className="flex-row justify-between">
                <View>
                  <Text className="font-rubik text-white/70 text-sm">Tâches terminées</Text>
                  <Text className="font-rubik-bold text-white text-2xl">
                    {stats.completedTasks}/{stats.totalTasks}
                  </Text>
                </View>
                <View className="h-12 w-12 rounded-full bg-white/20 items-center justify-center">
                  <Ionicons name="checkmark-circle" size={24} color="white" />
                </View>
              </View>

              {/* Barre de progression */}
              <View className="h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
                <View 
                  className="h-full bg-white" 
                  style={{ width: `${stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0}%` }} 
                />
              </View>
            </View>
          </View>
        </View>

        <View className="px-5 pt-6">
          {/* Statistiques */}
          <View className="flex-row flex-wrap justify-between gap-4 mb-8">
            <StatCard 
              title="Personnel" 
              value={stats.totalPersonnel} 
              icon="people" 
              color="bg-primary" 
              onPress={() => router.push('/personnel')}
            />
            <StatCard 
              title="Tâches totales" 
              value={stats.totalTasks} 
              icon="list" 
              color="bg-secondary" 
              onPress={() => router.push('/tasks')}
            />
            <StatCard 
              title="Tâches en attente" 
              value={stats.pendingTasks} 
              icon="time" 
              color="bg-accent" 
              onPress={() => router.push('/tasks?filter=pending')}
            />
          </View>

          {/* Tâches récentes */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-rubik-medium text-xl text-text">Tâches récentes</Text>
              <TouchableOpacity 
                className="flex-row items-center" 
                onPress={() => router.push('/tasks')}
              >
                <Text className="font-rubik text-primary mr-1">Voir tout</Text>
                <Ionicons name="chevron-forward" size={16} color="#4F46E5" />
              </TouchableOpacity>
            </View>

            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onUpdate={loadDashboardData} 
                />
              ))
            ) : (
              <Card>
                <View className="items-center py-8">
                  <Ionicons name="document-outline" size={48} color="#9CA3AF" />
                  <Text className="font-rubik text-text-secondary text-center mt-4">
                    Aucune tâche disponible
                  </Text>
                  <Button 
                    title="Créer une tâche" 
                    onPress={() => router.push('/tasks/new')} 
                    variant="primary"
                    size="small"
                    icon="add"
                    iconPosition="left"
                    rounded={true}
                    className="mt-4"
                  />
                </View>
              </Card>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
