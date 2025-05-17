import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { personnelApi } from "../../utils/api";
import { Personnel } from "../../utils/types";
import { AppBar } from "../_layout";

export default function PersonnelLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // L'en-tête sera géré par les écrans individuels
      }}
    >
      <Stack.Screen 
        name="index"
        options={{
          headerShown: false, // Géré par le layout des tabs
        }}
      />
      <Stack.Screen 
        name="[id]"
        options={{
          headerShown: true,
          header: (props) => {
            const params = props.route.params as { id: string } | undefined;
            const id = params?.id;
            
            // Using a function component to handle state and effects
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
              
              const title = personnel ? `${personnel.prenom} ${personnel.nom}` : "Détails du personnel";
              return <AppBar title={title} />;
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
            
            // Using a function component to handle state and effects
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
              
              const title = personnel ? `${personnel.prenom} ${personnel.nom}` : "Détails du personnel";
              return <AppBar title={title} />;
            };
            
            return <HeaderContent />;
          },
        }}
      />
    </Stack>
  );
}
