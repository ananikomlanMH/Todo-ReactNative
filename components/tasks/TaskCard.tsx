import { toCapitalize } from '@/utils/helper';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { taskApi } from '../../utils/api';
import { Task } from '../../utils/types';
import Badge from '../ui/Badge';

interface TaskCardProps {
  task: Task;
  onUpdate?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/tasks/${task.id}`);
  };

  const handleMarkCompleted = async () => {
    try {
      await taskApi.markAsCompleted(task.id!);
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Erreur lors du marquage de la tâche comme terminée:', error);
    }
  };

  const getPriorityBadge = () => {
    switch (task.priorite) {
      case 'haute':
        return <Badge text="Haute" variant="danger" />;
      case 'moyenne':
        return <Badge text="Moyenne" variant="warning" />;
      case 'basse':
        return <Badge text="Basse" variant="info" />;
      default:
        return null;
    }
  };

  const getPriorityColor = () => {
    switch (task.priorite) {
      case 'haute':
        return '#EF4444';
      case 'moyenne':
        return '#F59E0B';
      case 'basse':
        return '#3B82F6';
      default:
        return '#9CA3AF';
    }
  };

  const getStatusBadge = () => {
    if (task.realisee) {
      return <Badge text="Terminée" variant="success" />;
    }

    switch (task.statut) {
      case 'en cours':
        return <Badge text="En cours" variant="info" />;
      case 'à faire':
        return <Badge text="À faire" variant="warning" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non définie';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      className="bg-white rounded-md  mb-4 overflow-hidden border border-gray-200"
      style={{ elevation: 2 }}
    >
      {/* Barre de couleur indiquant le niveau de priorité */}
      <View 
        className="h-1.5 w-full" 
        style={{ backgroundColor: getPriorityColor() }}
      />

      <View className="p-4">
        <View className="flex-row items-start">
          <TouchableOpacity 
            className={`mr-3 h-7 w-7 rounded-full border-2 flex items-center justify-center shadow-sm ${
              task.realisee ? 'bg-success border-success' : 'border-gray-300 bg-white'
            }`}
            onPress={handleMarkCompleted}
            disabled={task.realisee}
            style={{ elevation: 1 }}
          >
            {task.realisee && <Ionicons name="checkmark" size={16} color="white" />}
          </TouchableOpacity>

          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <Text 
                className={`font-rubik-medium text-lg ${task.realisee ? 'text-gray-400 line-through' : 'text-text'}`}
                numberOfLines={1}
                style={{ maxWidth: '80%' }}
              >
                {task.titre}
              </Text>

              <View 
                className={`px-2 py-0.5 rounded-full ${
                  task.realisee ? 'bg-success/10' : 'bg-primary/10'
                }`}
              >
                <Text 
                  className={`font-rubik-medium text-xs ${
                    task.realisee ? 'text-success' : 'text-primary'
                  }`}
                >
                  {task.realisee ? 'Terminée' : (toCapitalize(task.statut) || 'À faire')}
                </Text>
              </View>
            </View>

            {task.description && (
              <Text 
                className={`font-rubik text-sm mt-1 ${task.realisee ? 'text-gray-400' : 'text-text-secondary'}`} 
                numberOfLines={2}
              >
                {task.description}
              </Text>
            )}

            <View className="flex-row justify-between items-center mt-4">
              <View className="flex-row items-center">
                {task.dateEcheance && (
                  <View className="flex-row items-center mr-4">
                    <View className="h-6 w-6 rounded-full bg-primary/10 items-center justify-center mr-1">
                      <Ionicons name="calendar-outline" size={14} color="#4F46E5" />
                    </View>
                    <Text className="font-rubik-medium text-xs text-text-secondary">
                      {formatDate(task.dateEcheance)}
                    </Text>
                  </View>
                )}

                {task.personnel && (
                  <View className="flex-row items-center">
                    <View className="h-6 w-6 rounded-full bg-secondary/10 items-center justify-center mr-1">
                      <Ionicons name="person-outline" size={14} color="#10B981" />
                    </View>
                    <Text className="font-rubik-medium text-xs text-text-secondary">
                      {task.personnel.prenom} {task.personnel.nom}
                    </Text>
                  </View>
                )}
              </View>

              <View 
                className={`px-2 py-0.5 rounded-full`}
                style={{ backgroundColor: `${getPriorityColor()}20` }}
              >
                <Text 
                  className={`font-rubik-medium text-xs`}
                  style={{ color: getPriorityColor() }}
                >
                  {toCapitalize(task.priorite) || 'Normale'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;
