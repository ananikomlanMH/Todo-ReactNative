import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { AppBar } from "../_layout";
import { taskApi } from "../../utils/api";
import { Task } from "../../utils/types";

export default function TasksLayout() {
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
              const [task, setTask] = useState<Task | null>(null);
              const [loading, setLoading] = useState(true);
              
              useEffect(() => {
                if (id) {
                  const fetchTask = async () => {
                    try {
                      const data = await taskApi.getById(parseInt(id));
                      setTask(data);
                    } catch (error) {
                      console.error('Error loading task:', error);
                    } finally {
                      setLoading(false);
                    }
                  };
                  
                  fetchTask();
                }
              }, [id]);
              
              const title = task ? task.titre : "Détails de la tâche";
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
            return <AppBar title="Nouvelle tâche" />;
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
              const [task, setTask] = useState<Task | null>(null);
              const [loading, setLoading] = useState(true);
              
              useEffect(() => {
                if (id) {
                  const fetchTask = async () => {
                    try {
                      const data = await taskApi.getById(parseInt(id));
                      setTask(data);
                    } catch (error) {
                      console.error('Error loading task:', error);
                    } finally {
                      setLoading(false);
                    }
                  };
                  
                  fetchTask();
                }
              }, [id]);
              
              const title = task ? `Modifier: ${task.titre}` : "Modifier la tâche";
              return <AppBar title={title} />;
            };
            
            return <HeaderContent />;
          },
        }}
      />
    </Stack>
  );
}
