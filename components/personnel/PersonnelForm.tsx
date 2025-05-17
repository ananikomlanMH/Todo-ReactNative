import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { personnelApi } from '../../utils/api';
import { Personnel } from '../../utils/types';
import Button from '../ui/Button';
import FormField from '../ui/FormField';

interface PersonnelFormProps {
  personnel?: Personnel;
  onSuccess?: () => void;
}

const PersonnelForm: React.FC<PersonnelFormProps> = ({ personnel, onSuccess }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Personnel>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    poste: '',
    departement: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (personnel) {
      setFormData({
        nom: personnel.nom,
        prenom: personnel.prenom,
        email: personnel.email,
        telephone: personnel.telephone || '',
        poste: personnel.poste || '',
        departement: personnel.departement || '',
      });
    }
  }, [personnel]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est obligatoire';
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est obligatoire';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est obligatoire';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      if (personnel?.id) {
        // Mise à jour d'un personnel existant
        await personnelApi.update(personnel.id, formData);
        Alert.alert('Succès', 'Le membre du personnel a été mis à jour avec succès');
      } else {
        // Création d'un nouveau personnel
        await personnelApi.create(formData);
        Alert.alert('Succès', 'Le membre du personnel a été créé avec succès');
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

  const handleChange = (field: keyof Personnel, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <ScrollView className="flex-1 p-4 pt-5">
      <FormField
        label="Nom"
        value={formData.nom}
        onChangeText={(value) => handleChange('nom', value)}
        placeholder="Entrez le nom"
        error={errors.nom}
      />
      <FormField
        label="Prénom"
        value={formData.prenom}
        onChangeText={(value) => handleChange('prenom', value)}
        placeholder="Entrez le prénom"
        error={errors.prenom}
      />
      <FormField
        label="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        placeholder="Entrez l'email"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />
      <FormField
        label="Téléphone"
        value={formData.telephone}
        onChangeText={(value) => handleChange('telephone', value)}
        placeholder="Entrez le numéro de téléphone"
        keyboardType="phone-pad"
        error={errors.telephone}
      />
      <FormField
        label="Poste"
        value={formData.poste}
        onChangeText={(value) => handleChange('poste', value)}
        placeholder="Entrez le poste"
        error={errors.poste}
      />
      <FormField
        label="Département"
        value={formData.departement}
        onChangeText={(value) => handleChange('departement', value)}
        placeholder="Entrez le département"
        error={errors.departement}
      />

      <View className="flex-row mt-4 space-x-4">
        <View className="flex-1">
          <Button
            title={personnel ? 'Mettre à jour' : 'Créer'}
            onPress={handleSubmit}
            loading={loading}
            fullWidth
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PersonnelForm;
