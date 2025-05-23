import {Stack, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import {Alert} from "react-native";
import DropdownMenu, {DropdownMenuItem} from "../../components/ui/DropdownMenu";
import {taskApi} from "../../utils/api";
import {Task} from "../../utils/types";
import {AppBar} from "../../components/ui/AppBar";
import ConfirmationModal from "../../components/ui/ConfirmationModal";

export default function TasksLayout() {
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
                         * Récupère les données de la tâche et configure le menu d'actions
                         */
                        const HeaderContent = () => {
                            const router = useRouter();
                            const [task, setTask] = useState<Task | null>(null);
                            const [, setDeleting] = useState(false);
                            const [showDeleteModal, setShowDeleteModal] = useState(false);

                            useEffect(() => {
                                if (id) {
                                    const fetchTask = async () => {
                                        try {
                                            const data = await taskApi.getById(parseInt(id));
                                            setTask(data);
                                        } catch (error) {
                                            console.error('Error loading task:', error);
                                        }
                                    };

                                    fetchTask();
                                }
                            }, []);

                            const handleDelete = () => {
                                if (!task) return;
                                setShowDeleteModal(true);
                            };

                            const confirmDelete = async () => {
                                if (!id) return;
                                setDeleting(true);
                                try {
                                    await taskApi.delete(parseInt(id));
                                    Alert.alert('Succès', 'La tâche a été supprimée avec succès');
                                    router.back();
                                } catch (error) {
                                    console.error('Erreur lors de la suppression de la tâche:', error);
                                    Alert.alert('Erreur', 'Impossible de supprimer la tâche');
                                } finally {
                                    setDeleting(false);
                                    setShowDeleteModal(false);
                                }
                            };


                            const title = task ? task.titre : "Détails de la tâche";

                            const dropdownItems: DropdownMenuItem[] = task ? [
                                {
                                    label: 'Modifier',
                                    icon: 'create-outline',
                                    onPress: () => router.push(`/tasks/edit/${task.id}`)
                                },
                                {
                                    label: 'Supprimer',
                                    icon: 'trash-outline',
                                    variant: 'danger' as const,
                                    onPress: handleDelete
                                }
                            ] : [];


                            const rightAction = task ? <DropdownMenu items={dropdownItems}/> : undefined;

                            return (
                                <>
                                    <AppBar title={title} rightAction={rightAction}/>
                                    <ConfirmationModal
                                        visible={showDeleteModal}
                                        title="Confirmation"
                                        message={`Êtes-vous sûr de vouloir supprimer la tâche "${task?.titre}" ?`}
                                        cancelText="Annuler"
                                        confirmText="Supprimer"
                                        onCancel={() => setShowDeleteModal(false)}
                                        onConfirm={confirmDelete}
                                        isDestructive={true}
                                    />
                                </>
                            );
                        };

                        return <HeaderContent/>;
                    },
                }}
            />
            <Stack.Screen
                name="new"
                options={{
                    headerShown: true,
                    header: (props) => {
                        return <AppBar title="Nouvelle tâche"/>;
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
                         * Récupère les données de la tâche et configure le menu d'actions
                         */
                        const HeaderContent = () => {
                            const [task, setTask] = useState<Task | null>(null);

                            useEffect(() => {
                                if (id) {
                                    const fetchTask = async () => {
                                        try {
                                            const data = await taskApi.getById(parseInt(id));
                                            setTask(data);
                                        } catch (error) {
                                            console.error('Error loading task:', error);
                                        }
                                    };

                                    fetchTask();
                                }
                            }, []);

                            const title = task ? `Modifier: ${task.titre}` : "Modifier la tâche";
                            return <AppBar title={title}/>;
                        };

                        return <HeaderContent/>;
                    },
                }}
            />
        </Stack>
    );
}
