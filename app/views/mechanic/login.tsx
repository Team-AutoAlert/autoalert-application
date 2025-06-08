import { useState } from "react";
import { mechanicLogin } from "../../services/mechanic/auth_service";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter, Link } from "expo-router";

export default function MechanicLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
  const result = await mechanicLogin(email, password);

  if (result.success) {
    Alert.alert("Success", "Logged in successfully!");
    // await AsyncStorage.setItem("token", result.token);

    setTimeout(() => {
      router.replace("/views/mechanic/(tabs)");
    }, 500);
  } else {
    Alert.alert("Error", result.message);
  }
};

  


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 justify-center items-center px-6">

          {/* Logo or Illustration */}
          <Image
            source={require("../../../assets/images/mechanic_login.png")} // Replace with your image
            className="w-40 h-40 mb-6"
            resizeMode="contain"
          />

          <Text className="text-3xl font-bold mb-4 text-blue-600">Mechanic Login</Text>
          <Text className="text-gray-600 mb-8 text-center">
            Welcome back! Please enter your credentials to continue.
          </Text>

          {/* Email Input */}
          <TextInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
          />

          {/* Password Input */}
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-2 text-base"
          />

          {/* Forgot Password */}
          <Link href="/views/mechanic/forgot_password" asChild>
            <TouchableOpacity className="self-end mb-6">
              <Text className="text-blue-500 font-medium text-sm">Forgot Password?</Text>
            </TouchableOpacity>
          </Link>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            className="w-full bg-blue-600 py-4 rounded-xl shadow-md"
          >
            <Text className="text-center text-white text-base font-semibold">Login</Text>
          </TouchableOpacity>

          {/* Back Link */}
          <Link href="/" asChild>
            <TouchableOpacity className="mt-6">
              <Text className="text-blue-500 font-medium text-base">← Back to Main Home</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
