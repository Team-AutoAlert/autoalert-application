// app/views/mechanic/success.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Success() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold text-green-600 mb-4">🎉 Registration Submitted!</Text>
      <Text className="text-center text-gray-700 mb-8">
        Thank you for registering. We will verify your information and contact you soon.
      </Text>
      <Text className="text-center text-gray-700 mb-8">
        This may take upto 1 working day. Please check your email.
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/")}
        className="bg-blue-600 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-medium text-base">Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
