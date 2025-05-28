// app/mechanic/login.tsx
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Link } from "expo-router";

export default function MechanicLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    // Example login logic (replace with API call)
    if (email === "mechanic@example.com" && password === "password123") {
      Alert.alert("Success", "Logged in successfully!");
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

      <Link href="/views/mechanic" asChild>
        <TouchableOpacity className="mt-4">
           <Text className="text-blue-500">← Back to Home</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
