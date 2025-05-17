import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { personnelApi, taskApi } from '../../utils/api';
import { Personnel, Task } from '../../utils/types';
import Button from '../ui/Button';
import FormField from '../ui/FormField';
import SelectField from '../ui/SelectField';

interface TaskFormProps {
  task?: Task;
  personnelId?: number;
  onSuccess?: () => void;
}

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

  const loadPersonnels = async () => {
    try {
      const data = await personnelApi.getAll();
      setPersonnels(data);
    } catch (error) {
      console.error('Erreur lors du chargement du personnel:', error);
      Alert.alert('Erreur', 'Impossible de charger la liste du personnel');
    }
  };

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

  const handleChange = (field: keyof Task, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange('dateEcheance', selectedDate.toISOString());
    }
  };

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
      
      <View className="mb-4">
        <FormField
          label="Date d'échéance"
          value={formatDate(formData.dateEcheance)}
          onFocus={() => setShowDatePicker(true)}
          placeholder="Sélectionner une date d'échéance"
          editable={false}
          error={errors.dateEcheance}
        />
        {showDatePicker && (
          <DateTimePicker
            value={formData.dateEcheance ? new Date(formData.dateEcheance) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

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
