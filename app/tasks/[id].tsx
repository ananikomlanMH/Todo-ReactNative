import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { taskApi } from '../../utils/api';
import { Task } from '../../utils/types';

export default function TaskDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState<Task | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [completing, setCompleting] = useState(false);

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
      console.error('Erreur lors du chargement des détails de la tâche:', error);
      Alert.alert('Erreur', 'Impossible de charger les détails de la tâche');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!task) return;

    Alert.alert(
      'Confirmation',
      `Êtes-vous sûr de vouloir supprimer la tâche "${task.titre}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            try {
              await taskApi.delete(parseInt(id!));
              Alert.alert('Succès', 'La tâche a été supprimée avec succès');
              router.back();
            } catch (error) {
              console.error('Erreur lors de la suppression de la tâche:', error);
              Alert.alert('Erreur', 'Impossible de supprimer la tâche');
            } finally {
              setDeleting(false);
            }
          }
        }
      ]
    );
  };

  const handleMarkCompleted = async () => {
    if (!task || task.realisee) return;

    setCompleting(true);
    try {
      await taskApi.markAsCompleted(parseInt(id!));
      Alert.alert('Succès', 'La tâche a été marquée comme terminée');
      loadTask();
    } catch (error) {
      console.error('Erreur lors du marquage de la tâche comme terminée:', error);
      Alert.alert('Erreur', 'Impossible de marquer la tâche comme terminée');
    } finally {
      setCompleting(false);
    }
  };

  const getPriorityBadge = () => {
    if (!task) return null;

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

  const getStatusBadge = () => {
    if (!task) return null;

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
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#287aea" />
        <Text className="font-rubik mt-4 text-gray-600">Chargement des détails...</Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 p-4">
        <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
        <Text className="font-rubik-medium text-lg text-gray-800 mt-4">
          Tâche non trouvée
        </Text>
        <Text className="font-rubik text-gray-600 text-center mt-2 mb-6">
          La tâche que vous recherchez n'existe pas ou a été supprimée.
        </Text>
        <Button title="Retour" onPress={() => router.back()} variant="primary" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Détails de la tâche */}
        <Card>
          <View className="flex-row items-start mb-4">
            <TouchableOpacity
              className={`mr-3 mt-1 h-6 w-6 rounded-full border flex items-center justify-center ${task.realisee ? 'bg-green-500 border-green-500' : 'border-gray-400'
                }`}
              onPress={handleMarkCompleted}
              disabled={task.realisee || completing}
            >
              {(task.realisee || completing) && <Ionicons name="checkmark" size={16} color="white" />}
            </TouchableOpacity>
            <View className="flex-1">
              <Text className={`font-rubik-bold text-xl ${task.realisee ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                {task.titre}
              </Text>
            </View>
          </View>

          {task.description && (
            <View className="mb-4 pb-4 border-b border-gray-200">
              <Text className="font-rubik-medium text-gray-700 mb-2">Description</Text>
              <Text className="font-rubik text-gray-600">{task.description}</Text>
            </View>
          )}

          <View className="flex-row flex-wrap gap-2 mb-4">
            {getPriorityBadge()}
            {getStatusBadge()}
          </View>

          <View className="border-t border-gray-200 pt-4 mt-2">
            {task.dateEcheance && (
              <View className="flex-row items-center mb-3">
                <Ionicons name="calendar-outline" size={20} color="#6B7280" />
                <Text className="font-rubik text-gray-700 ml-3">
                  Échéance: {formatDate(task.dateEcheance)}
                </Text>
              </View>
            )}
            {task.personnel && (
              <View className="flex-row items-center mb-3">
                <Ionicons name="person-outline" size={20} color="#6B7280" />
                <Text className="font-rubik text-gray-700 ml-3">
                  Assignée à: {task.personnel.prenom} {task.personnel.nom}
                </Text>
              </View>
            )}
            <View className="flex-row items-center mb-3">
              <Ionicons name="time-outline" size={20} color="#6B7280" />
              <Text className="font-rubik text-gray-700 ml-3">
                Créée le: {formatDate(task.createdAt)}
              </Text>
            </View>
            {task.updatedAt && task.updatedAt !== task.createdAt && (
              <View className="flex-row items-center mb-3">
                <Ionicons name="refresh-outline" size={20} color="#6B7280" />
                <Text className="font-rubik text-gray-700 ml-3">
                  Mise à jour le: {formatDate(task.updatedAt)}
                </Text>
              </View>
            )}
          </View>

          <View className="flex-row mt-4 space-x-3">

            {!task.realisee && (
              <View className="flex-1">
                <Button
                  title="Marquer comme terminée"
                  onPress={handleMarkCompleted}
                  variant="primary"
                  loading={completing}
                  fullWidth
                />
              </View>
            )}

            <View className="flex-1">
              <Button
                title="Modifier"
                onPress={() => router.push(`/tasks/edit/${task.id}`)}
                variant="secondary"
                fullWidth
              />
            </View>
            <View className="flex-1">
              <Button
                title="Supprimer"
                onPress={handleDelete}
                variant="danger"
                loading={deleting}
                fullWidth
              />
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
