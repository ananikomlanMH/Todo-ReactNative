import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import PersonnelForm from '../../../components/personnel/PersonnelForm';
import { personnelApi } from '../../../utils/api';
import { Personnel } from '../../../utils/types';

export default function EditPersonnel() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [personnel, setPersonnel] = useState<Personnel | null>(null);

  useEffect(() => {
    loadPersonnel();
  }, [id]);

  const loadPersonnel = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const data = await personnelApi.getById(parseInt(id));
      setPersonnel(data);
    } catch (error) {
      console.error('Erreur lors du chargement du personnel:', error);
      Alert.alert('Erreur', 'Impossible de charger les données du personnel');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#287aea" />
        <Text className="font-rubik mt-4 text-gray-600">Chargement des données...</Text>
      </View>
    );
  }

  if (!personnel) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 p-4">
        <Text className="font-rubik-medium text-lg text-gray-800 mb-4">
          Personnel non trouvé
        </Text>
        <Text className="font-rubik text-gray-600 text-center mb-6">
          Le membre du personnel que vous souhaitez modifier n'existe pas ou a été supprimé.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <PersonnelForm personnel={personnel} onSuccess={() => router.back()} />
    </View>
  );
}
