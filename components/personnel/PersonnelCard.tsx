import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { Personnel } from '../../utils/types';
import Card from '../ui/Card';

interface PersonnelCardProps {
  personnel: Personnel;
  onPress?: () => void;
}

const PersonnelCard: React.FC<PersonnelCardProps> = ({ personnel, onPress }) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/personnel/${personnel.id}`);
    }
  };

  return (
    <Card rounded='none' onPress={handlePress}>
      <View className="flex-row items-center">
        <View className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mr-4">
          <Text className="text-white font-rubik-bold text-lg">
            {personnel.prenom.charAt(0).toUpperCase()}{personnel.nom.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="font-rubik-medium text-lg text-gray-800">
            {personnel.prenom} {personnel.nom}
          </Text>
          <Text className="font-rubik text-gray-600">{personnel.poste || 'Non spécifié'}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      </View>
      <View className="mt-3 pt-3 border-t border-gray-50">
        <View className="flex-row items-center mb-1">
          <Ionicons name="mail-outline" size={16} color="#6B7280" className="mr-2" />
          <Text className="font-rubik text-gray-600 ml-2">{personnel.email}</Text>
        </View>
        {personnel.telephone && (
          <View className="flex-row items-center">
            <Ionicons name="call-outline" size={16} color="#6B7280" className="mr-2" />
            <Text className="font-rubik text-gray-600 ml-2">{personnel.telephone}</Text>
          </View>
        )}
        {personnel.departement && (
          <View className="flex-row items-center mt-1">
            <Ionicons name="business-outline" size={16} color="#6B7280" className="mr-2" />
            <Text className="font-rubik text-gray-600 ml-2">{personnel.departement}</Text>
          </View>
        )}
      </View>
    </Card>
  );
};

export default PersonnelCard;
