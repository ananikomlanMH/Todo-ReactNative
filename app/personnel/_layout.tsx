import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import DropdownMenu from "../../components/ui/DropdownMenu";
import { personnelApi } from "../../utils/api";
import { Personnel } from "../../utils/types";
import { AppBar } from "../_layout";

export default function PersonnelLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen 
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="[id]"
        options={{
          headerShown: true,
          header: (props) => {
            const params = props.route.params as { id: string } | undefined;
            const id = params?.id;
            
            /**
             * Composant HeaderContent pour gérer l'état et les actions
             * Récupère les données du personnel et configure le menu d'actions
             */
            const HeaderContent = () => {
              const router = useRouter();
              const [personnel, setPersonnel] = useState<Personnel | null>(null);
              const [loading, setLoading] = useState(true);
              const [deleting, setDeleting] = useState(false);
              
              useEffect(() => {
                if (id) {
                  const fetchPersonnel = async () => {
                    try {
                      const data = await personnelApi.getWithTasks(parseInt(id));
                      setPersonnel(data);
                    } catch (error) {
                      console.error('Error loading personnel:', error);
                    } finally {
                      setLoading(false);
                    }
                  };
                  
                  fetchPersonnel();
                }
              }, [id]);
              
              const handleDelete = async () => {
                
                if (!personnel) return;
                
                Alert.alert(
                  'Confirmation',
                  `Êtes-vous sûr de vouloir supprimer ${personnel.prenom} ${personnel.nom} ? Toutes les tâches associées seront également supprimées.`,
                  [
                    { text: 'Annuler', style: 'cancel' },
                    {
                      text: 'Supprimer',
                      style: 'destructive',
                      onPress: async () => {
                        setDeleting(true);
                        try {
                          await personnelApi.delete(parseInt(id!));
                          Alert.alert('Succès', 'Le membre du personnel a été supprimé avec succès');
                          router.back();
                        } catch (error) {
                          console.error('Erreur lors de la suppression du personnel:', error);
                          Alert.alert('Erreur', 'Impossible de supprimer le membre du personnel');
                        } finally {
                          setDeleting(false);
                        }
                      }
                    }
                  ]
                );
              };
              
              const title = personnel ? `${personnel.prenom} ${personnel.nom}` : "Détails du personnel";
              
              const dropdownItems = personnel ? [
                {
                  label: 'Modifier',
                  icon: 'create-outline',
                  onPress: () => router.push(`/personnel/edit/${personnel.id}`)
                },
                {
                  label: 'Supprimer',
                  icon: 'trash-outline',
                  variant: 'danger' as const,
                  onPress: handleDelete
                }
              ] : [];
              
              const rightAction = personnel ? <DropdownMenu items={dropdownItems} /> : undefined;
              
              return <AppBar title={title} rightAction={rightAction} />;
            };
            
            return <HeaderContent />;
          },
        }}
      />
      <Stack.Screen 
        name="new"
        options={{
          headerShown: true,
          header: (props) => {
            return <AppBar title="Nouveau personnel" />;
          },
        }}
      />
      <Stack.Screen 
        name="edit/[id]"
        options={{
          headerShown: true,
          header: (props) => {
            const params = props.route.params as { id: string } | undefined;
            const id = params?.id;
            
            /**
             * Composant HeaderContent pour gérer l'état et les actions
             * Récupère les données du personnel et configure le menu d'actions
             */
            const HeaderContent = () => {
              const [personnel, setPersonnel] = useState<Personnel | null>(null);
              const [loading, setLoading] = useState(true);
              
              useEffect(() => {
                if (id) {
                  const fetchPersonnel = async () => {
                    try {
                      const data = await personnelApi.getWithTasks(parseInt(id));
                      setPersonnel(data);
                    } catch (error) {
                      console.error('Error loading personnel:', error);
                    } finally {
                      setLoading(false);
                    }
                  };
                  
                  fetchPersonnel();
                }
              }, [id]);
              
              const title = personnel ? `Modifier: ${personnel.prenom} ${personnel.nom}` : "Modifier personnel";
              return <AppBar title={title} />;
            };
            
            return <HeaderContent />;
          },
        }}
      />
    </Stack>
  );
}
