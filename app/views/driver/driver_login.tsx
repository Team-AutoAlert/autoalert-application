import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

export default function DriverLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }
    // Example login logic (replace with real API call)
    if (email === "mechanic@example.com" && password === "password123") {
      Alert.alert("Success", "Logged in successfully!");
      // Redirect logic here
    } else {
      Alert.alert("Error", "Invalid credentials.");
    }
  };

  return (
    <View className="flex-1 bg-black px-6 pt-8">
      
      {/* Header */}
      <Text className="text-5xl text-red-500 font-mono font-bold text-center mb-8">
        Sign In
      </Text>

      {/* Username/Email Label */}
      <Text className="text-white text-2xl font-mono mb-2 text-center">
        Username/Email
      </Text>
      <TextInput
        placeholder=""
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="w-full border-2 border-white rounded-xl px-4 py-3 mb-6 text-white bg-transparent text-lg"
        placeholderTextColor="#aaa"
      />

      {/* Password Label */}
      <Text className="text-white text-2xl font-mono mb-2 text-center">
        Password
      </Text>
      <TextInput
        placeholder=""
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full border-2 border-white rounded-xl px-4 py-3 mb-8 text-white bg-transparent text-lg"
        placeholderTextColor="#aaa"
      />

      {/* Sign In Button */}
      <TouchableOpacity
        onPress={handleLogin}
        className="w-full bg-blue-300 py-4 rounded-xl"
      >
        <Text className="text-center text-white text-2xl font-mono font-medium">
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
