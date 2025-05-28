// app/views/mechanic/mechanic_home.tsx
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default function MechanicHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <View className="flex-1 bg-gray-800 relative px-4 pt-10">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">AUTO ALERT-MECH</Text>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="log-out-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      
    </View>
  );
}
