import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Props du composant ConfirmationModal
 * @property {boolean} visible - Indique si le modal est visible
 * @property {string} title - Titre du modal
 * @property {string} message - Message de confirmation
 * @property {string} cancelText - Texte du bouton d'annulation
 * @property {string} confirmText - Texte du bouton de confirmation
 * @property {Function} onCancel - Fonction appelée lors de l'annulation
 * @property {Function} onConfirm - Fonction appelée lors de la confirmation
 * @property {boolean} isDestructive - Indique si l'action est destructive (rouge)
 */
type ConfirmationModalProps = {
  visible: boolean;
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
  isDestructive?: boolean;
};

/**
 * Composant de modal de confirmation
 * Utilisé pour confirmer des actions importantes comme la suppression
 */
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  cancelText = 'Annuler',
  confirmText = 'Confirmer',
  onCancel,
  onConfirm,
  isDestructive = false,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onCancel}
      >
        <View className="bg-white rounded-lg p-5 mx-4" style={styles.modalContainer}>
          <TouchableOpacity activeOpacity={1}>
            <Text className="text-xl font-rubik-medium mb-2">{title}</Text>
            <Text className="text-gray-700 mb-5">{message}</Text>
            
            <View className="flex-row justify-end space-x-3">
              <TouchableOpacity
                className="px-4 py-2 rounded-lg bg-gray-200"
                onPress={onCancel}
              >
                <Text className="font-rubik text-gray-700">{cancelText}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className={`px-4 py-2 rounded-lg ${isDestructive ? 'bg-red-500' : 'bg-blue-500'}`}
                onPress={onConfirm}
              >
                <Text className="font-rubik text-white">{confirmText}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ConfirmationModal;