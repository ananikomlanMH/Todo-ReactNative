import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IoniconsName } from '../../utils/iconTypes';

/**
 * Type définissant un élément du menu déroulant
 * @property {string} label - Texte à afficher pour l'option
 * @property {IoniconsName} icon - Nom de l'icône Ionicons à afficher
 * @property {Function} onPress - Fonction à exécuter lors du clic
 * @property {string} variant - Variante de style (défaut ou danger)
 */
export type DropdownMenuItem = {
  label: string;
  icon: IoniconsName;
  onPress: () => void;
  variant?: 'default' | 'danger';
};

/**
 * Props du composant DropdownMenu
 * @property {DropdownMenuItem[]} items - Liste des éléments du menu
 */
type DropdownMenuProps = {
  items: DropdownMenuItem[];
};

/**
 * Composant de menu déroulant
 * Affiche un bouton qui, lorsqu'il est cliqué, ouvre un menu avec des options
 * Utilisé principalement dans l'AppBar pour les actions contextuelles
 */
const DropdownMenu: React.FC<DropdownMenuProps> = ({ items }) => {
  const [visible, setVisible] = useState(false);

  /**
   * Bascule l'affichage du menu
   */
  const toggleMenu = () => {
    setVisible(!visible);
  };

  /**
   * Ferme le menu
   */
  const closeMenu = () => {
    setVisible(false);
  };

  return (
    <View>
      <TouchableOpacity 
        className="h-10 w-10 rounded-full hover:bg-white/20 items-center justify-center"
        onPress={toggleMenu}
      >
        <Ionicons name="ellipsis-vertical" size={20} color="white" />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeMenu}
        >
          <View className="absolute top-16 right-4 bg-white rounded-lg shadow-lg overflow-hidden" style={styles.menuContainer}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={`px-4 py-3 flex-row items-center ${
                  index < items.length - 1 ? 'border-b border-gray-100' : ''
                } ${ item.variant === 'danger' ? 'bg-red-100' : '' }`}
                onPress={() => {
                  closeMenu();
                  item.onPress();
                }}
              >
                <Ionicons 
                  name={item.icon as any}
                  size={20} 
                  color={item.variant === 'danger' ? '#EF4444' : '#6B7280'} 
                />
                <Text 
                  className={`ml-2 font-rubik ${
                    item.variant === 'danger' ? 'text-red-500' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menuContainer: {
    width: 200,
    maxHeight: Dimensions.get('window').height * 0.7,
  },
});

export default DropdownMenu;
