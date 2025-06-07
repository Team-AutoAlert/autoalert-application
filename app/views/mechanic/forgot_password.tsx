import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useRouter, Link } from "expo-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleReset = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    // Simulate API call
    Alert.alert(
      "Reset Link Sent",
      "Password reset instructions have been sent to your email."
    );
    setTimeout(() => {
      router.replace("/views/mechanic/login");
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 justify-center items-center px-6">

          {/* Optional Illustration */}
          <Image
            source={require("../../../assets/images/forgot_password.png")} // Replace with your image
            className="w-40 h-40 mb-6"
            resizeMode="contain"
          />

          <Text className="text-2xl font-bold mb-2 text-blue-600">Forgot Password?</Text>
          <Text className="text-center text-gray-600 mb-8">
            Enter your registered email address. We’ll send you instructions to reset your password.
          </Text>

          {/* Email Input */}
          <TextInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base"
          />

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleReset}
            className="w-full bg-blue-600 py-4 rounded-xl shadow-md"
          >
            <Text className="text-center text-white text-base font-semibold">Send Reset Link</Text>
          </TouchableOpacity>

          {/* Back to Login */}
          <Link href="/views/mechanic/login" asChild>
            <TouchableOpacity className="mt-6">
              <Text className="text-blue-500 font-medium text-base">← Back to Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
