import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import "./global.css";

import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

// Composant AppBar dynamique qui sera utilisé dans les layouts des dossiers enfants
export function AppBar({ title, showBackButton = true, rightAction }: { title: string, showBackButton?: boolean, rightAction?: React.ReactNode }) {
  return (
    <View className="bg-primary pt-4 pb-4 px-4">
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
      <View className="flex-row items-center gap-5">
        {showBackButton ? (
          <TouchableOpacity 
            className="h-10 w-10 rounded-full bg-white/20 items-center justify-center"
            onPress={() => window.history.back()}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
        ) : <View className="w-10" />}
        
        <Text className="font-rubik-bold text-xl text-white">{title}</Text>
        
        {rightAction ? rightAction : <View className="w-10" />}
      </View>
    </View>
  );
}

// Layout principal - Utilise Stack comme racine
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Black": require("../assets/fonts/Rubik-Black.ttf"),
    "Rubik-BlackItalic": require("../assets/fonts/Rubik-BlackItalic.ttf"),
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-BoldItalic": require("../assets/fonts/Rubik-BoldItalic.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-ExtraBoldItalic": require("../assets/fonts/Rubik-ExtraBoldItalic.ttf"),
    "Rubik-Italic": require("../assets/fonts/Rubik-Italic.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-LightItalic": require("../assets/fonts/Rubik-LightItalic.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-MediumItalic": require("../assets/fonts/Rubik-MediumItalic.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-SemiBoldItalic": require("../assets/fonts/Rubik-SemiBoldItalic.ttf"),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  // Utiliser un Stack comme racine de navigation
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
