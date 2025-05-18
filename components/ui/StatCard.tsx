import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IoniconsName } from '../../utils/iconTypes';

/**
 * Composant pour afficher une carte de statistique
 * @param {string} title - Titre de la statistique
 * @param {number} value - Valeur numérique à afficher
 * @param {IoniconsName} icon - Nom de l'icône Ionicons
 * @param {string} color - Classe CSS pour la couleur de fond de l'icône
 * @param {Function} onPress - Fonction appelée lors du clic sur la carte
 */
interface StatCardProps {
  title: string;
  value: number;
  icon: IoniconsName;
  color: string;
  onPress: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color, 
  onPress 
}) => (
  <TouchableOpacity 
    className={`bg-white rounded-md p-5 flex-1 min-w-[45%] border border-gray-100`}
    onPress={onPress}
    activeOpacity={0.7}
    style={{ elevation: 3 }}
  >
    <View className="flex-row items-center justify-between mb-2">
      <View className={`h-12 w-12 rounded-full ${color} items-center justify-center shadow-sm`}>
        <Ionicons name={icon} size={22} color="white" />
      </View>
      <Text className="font-rubik-bold text-3xl text-gray-800">{value}</Text>
    </View>
    <Text className="font-rubik-medium text-gray-600 mt-2">{title}</Text>
  </TouchableOpacity>
);

export default StatCard;