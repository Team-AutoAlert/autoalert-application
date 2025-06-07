import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Success() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      {/* Success Illustration or Icon */}
      <View className="bg-green-100 p-5 rounded-full mb-6">
        <Ionicons name="checkmark-circle" size={80} color="#16a34a" />
      </View>

      {/* Heading */}
      <Text className="text-2xl font-bold text-green-700 mb-3 text-center">
        Registration Submitted!
      </Text>

      {/* Body Text */}
      <Text className="text-gray-600 text-center mb-1">
        🎉 Thank you for registering as a mechanic.
      </Text>
      <Text className="text-gray-600 text-center mb-6">
        Your details are under review. We’ll notify you within 1 working day via email.
      </Text>

      {/* Back to Home Button */}
      <TouchableOpacity
        onPress={() => router.push("/")}
        className="bg-blue-600 px-6 py-3 rounded-full w-full max-w-[280px]"
      >
        <Text className="text-white text-center font-semibold text-base">
          Back to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}
