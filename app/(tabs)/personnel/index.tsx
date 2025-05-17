import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PersonnelCard from '../../../components/personnel/PersonnelCard';
import Button from '../../../components/ui/Button';
import { personnelApi } from '../../../utils/api';
import { Personnel } from '../../../utils/types';

export default function PersonnelList() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPersonnel, setFilteredPersonnel] = useState<Personnel[]>([]);

  useEffect(() => {
    loadPersonnel();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPersonnel(personnel);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = personnel.filter(
        p => 
          p.nom.toLowerCase().includes(query) || 
          p.prenom.toLowerCase().includes(query) ||
          p.email.toLowerCase().includes(query) ||
          (p.departement && p.departement.toLowerCase().includes(query))
      );
      setFilteredPersonnel(filtered);
    }
  }, [searchQuery, personnel]);

  const loadPersonnel = async () => {
    setLoading(true);
    try {
      const data = await personnelApi.getAll();
      setPersonnel(data);
      setFilteredPersonnel(data);
    } catch (error) {
      console.error('Erreur lors du chargement du personnel:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadPersonnel();
  };

  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#287aea" />
        <Text className="font-rubik mt-4 text-gray-600">Chargement du personnel...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-2 font-rubik text-gray-800 outline-none"
            placeholder="Rechercher un membre du personnel..."
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

      <FlatList
        data={filteredPersonnel}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => <PersonnelCard personnel={item} />}
        contentContainerClassName="m-0"
        contentContainerStyle={{ flexGrow: 1 }} 
        ItemSeparatorComponent={
          () => <View className='border-b border-gray-100'></View>
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center px-4">
            <Ionicons name="people" size={48} color="#D1D5DB" />
            <Text className="font-rubik-medium text-gray-500 mt-4 mb-2">
              Aucun membre du personnel trouvé
            </Text>
            <Text className="font-rubik text-gray-400 text-center mb-4">
              {searchQuery ? "Essayez une autre recherche" : "Ajoutez votre premier membre du personnel"}
            </Text>
            {!searchQuery && (
              <Button
                title="Ajouter un personnel"
                onPress={() => router.push('/personnel/new')}
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
        onPress={() => router.push('/personnel/new')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
