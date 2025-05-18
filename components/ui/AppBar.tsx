import {StatusBar, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

/**
 * Composant AppBar réutilisable
 * Barre d'application personnalisée avec bouton de retour et actions contextuelles
 * @param title - Titre à afficher dans la barre
 * @param showBackButton - Affiche ou non le bouton de retour
 * @param rightAction - Élément React à afficher à droite (actions contextuelles)
 */
export function AppBar({ title, showBackButton = true, rightAction }: { title: string, showBackButton?: boolean, rightAction?: React.ReactNode }) {
    return (
        <View className="bg-primary pt-4 pb-4 px-4">
            <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-5">
                    {showBackButton ? (
                        <TouchableOpacity
                            className="h-10 w-10 rounded-full bg-white/20 items-center justify-center"
                            onPress={() => window.history.back()}
                        >
                            <Ionicons name="arrow-back" size={20} color="white" />
                        </TouchableOpacity>
                    ) : <View className="w-10" />}

                    <Text className="font-rubik-bold text-lg text-white">{title}</Text>
                </View>
                {rightAction ? rightAction : <View className="w-10" />}
            </View>
        </View>
    );
}