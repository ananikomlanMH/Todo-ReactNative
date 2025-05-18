import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { personnelApi, taskApi } from '../../utils/api';
import { Personnel, Task } from '../../utils/types';
import Button from '../ui/Button';
import FormField from '../ui/FormField';
import SelectField from '../ui/SelectField';

/**
 * Props du composant TaskForm
 * @property {Task} task - Tâche existante à modifier (optionnel)
 * @property {number} personnelId - ID du personnel à pré-sélectionner (optionnel)
 * @property {Function} onSuccess - Callback appelé après la soumission réussie
 */
interface TaskFormProps {
  task?: Task;
  personnelId?: number;
  onSuccess?: () => void;
}

/**
 * Formulaire de création/édition de tâche
 * Permet de créer une nouvelle tâche ou de modifier une tâche existante
 */
const TaskForm: React.FC<TaskFormProps> = ({ task, personnelId, onSuccess }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [personnels, setPersonnels] = useState<Personnel[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formData, setFormData] = useState<Task>({
    titre: '',
    description: '',
    dateEcheance: '',
    priorite: 'moyenne',
    statut: 'à faire',
    realisee: false,
    personnelId: personnelId || 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (task) {
      setFormData({
        titre: task.titre,
        description: task.description || '',
        dateEcheance: task.dateEcheance || '',
        priorite: task.priorite || 'moyenne',
        statut: task.statut || 'à faire',
        realisee: task.realisee,
        personnelId: task.personnelId,
      });
    } else if (personnelId) {
      setFormData(prev => ({ ...prev, personnelId }));
    }

    // Charger la liste du personnel
    loadPersonnels();
  }, [task, personnelId]);

  /**
   * Charge la liste du personnel depuis l'API
   */
  const loadPersonnels = async () => {
    try {
      const data = await personnelApi.getAll();
      setPersonnels(data);
    } catch (error) {
      console.error('Erreur lors du chargement du personnel:', error);
      Alert.alert('Erreur', 'Impossible de charger la liste du personnel');
    }
  };

  /**
   * Valide les données du formulaire avant soumission
   * @returns {boolean} True si les données sont valides, sinon False
   */
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.titre.trim()) {
      newErrors.titre = 'Le titre est obligatoire';
    }

    if (!formData.personnelId) {
      newErrors.personnelId = 'Veuillez sélectionner un membre du personnel';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Gère la soumission du formulaire
   * Crée ou met à jour une tâche selon le contexte
   */
  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      if (task?.id) {
        // Mise à jour d'une tâche existante
        await taskApi.update(task.id, formData);
        Alert.alert('Succès', 'La tâche a été mise à jour avec succès');
      } else {
        // Création d'une nouvelle tâche
        await taskApi.create(formData);
        Alert.alert('Succès', 'La tâche a été créée avec succès');
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.back();
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Met à jour un champ spécifique du formulaire
   * @param {keyof Task} field - Clé du champ à mettre à jour
   * @param {any} value - Nouvelle valeur du champ
   */
  const handleChange = (field: keyof Task, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  /**
   * Gère le changement de date dans le sélecteur de date
   * @param {any} event - Événement du sélecteur de date
   * @param {Date} selectedDate - Date sélectionnée (optionnelle)
   */
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange('dateEcheance', selectedDate.toISOString());
    }
  };

  /**
   * Formate une date pour l'affichage
   * @param {string} dateString - Chaîne de date ISO à formater (optionnelle)
   * @returns {string} Date formatée ou chaîne vide si non définie
   */
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const priorityOptions = [
    { label: 'Haute', value: 'haute' },
    { label: 'Moyenne', value: 'moyenne' },
    { label: 'Basse', value: 'basse' },
  ];

  const statusOptions = [
    { label: 'À faire', value: 'à faire' },
    { label: 'En cours', value: 'en cours' },
    { label: 'Terminée', value: 'terminée' },
  ];

  return (
    <ScrollView className="flex-1 p-4">
      <FormField
        label="Titre"
        value={formData.titre}
        onChangeText={(value) => handleChange('titre', value)}
        placeholder="Entrez le titre de la tâche"
        error={errors.titre}
      />
      <FormField
        label="Description"
        value={formData.description}
        onChangeText={(value) => handleChange('description', value)}
        placeholder="Entrez la description de la tâche"
        multiline
        numberOfLines={4}
        error={errors.description}
      />

      <FormField
        label="Date d'échéance"
        value={formData.dateEcheance}
        onChangeText={(value) => handleChange('dateEcheance', value)}
        placeholder="Sélectionner une date d'échéance"
        error={errors.dateEcheance}
      />

      <SelectField
        label="Priorité"
        options={priorityOptions}
        value={formData.priorite}
        onValueChange={(value) => handleChange('priorite', value)}
        error={errors.priorite}
      />

      <SelectField
        label="Statut"
        options={statusOptions}
        value={formData.statut}
        onValueChange={(value) => handleChange('statut', value)}
        error={errors.statut}
      />

      <SelectField
        label="Assignée à"
        options={personnels.map(p => ({
          label: `${p.prenom} ${p.nom}`,
          value: p.id!
        }))}
        value={formData.personnelId}
        onValueChange={(value) => handleChange('personnelId', value)}
        error={errors.personnelId}
      />

      <View className="flex-row mt-4 space-x-4">
        <View className="flex-1">
          <Button
            title={task ? 'Mettre à jour' : 'Créer'}
            onPress={handleSubmit}
            loading={loading}
            fullWidth
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default TaskForm;
