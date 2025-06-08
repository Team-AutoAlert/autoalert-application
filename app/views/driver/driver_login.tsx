import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from 'expo-router';
import { login } from "../../services/driver/auth_service";
import { useAuth } from "../../context/AuthContext";

export default function DriverLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const auth = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      Alert.alert("Success", result.message);
      console.log("login success");
      if (result.token && result.user && result.user.email) {
        await auth.login(result.user.email, result.token);
      }
      // The _layout.tsx will handle the navigation based on AuthContext state change
      // router.replace({ pathname: '/views/driver/home' }); 
    } else {
      Alert.alert("Error", result.message);
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
