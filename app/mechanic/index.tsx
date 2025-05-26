// app/mechanic/index.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function MechanicHome() {
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-4 text-blue-600">Mechanic Portal</Text>
      <Text className="text-lg text-gray-700 mb-8">Welcome! Please log in to continue.</Text>

      <Link href="/mechanic/login" asChild>
        <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-lg">
          <Text className="text-white font-medium text-base">Go to Login</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

