import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

export default function MechanicLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    // Example login logic (replace with real API call)
    if (email === "mechanic@example.com" && password === "password123") {
      Alert.alert("Success", "Logged in successfully!");
      setTimeout(() => {
        router.replace("/views/mechanic/mechanic_home"); // ✅ Redirect to Mechanic Home
      }, 500);
    } else {
      Alert.alert("Error", "Invalid credentials.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-6 text-blue-600">Mechanic Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 text-base"
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="w-full bg-blue-600 py-3 rounded-lg"
      >
        <Text className="text-center text-white text-base font-medium">Login</Text>
      </TouchableOpacity>

      <Link href="/" asChild>
        <TouchableOpacity className="mt-4">
          <Text className="text-blue-500">← Back to Main Home</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
