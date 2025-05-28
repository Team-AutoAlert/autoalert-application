// app/views/mechanic/index.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function MechanicHome() {
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-4 text-blue-600">Mechanic Portal</Text>
      <Text className="text-lg text-gray-700 mb-8 text-center">
        Seamlessly connect with trusted Drivers anytime, anywhere.
      </Text>

      {/* Login Button */}
      <Link href="/views/mechanic/login" asChild>
        <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-lg mb-4">
          <Text className="text-white font-medium text-base">Go to Login</Text>
        </TouchableOpacity>
      </Link>

      {/* Sign Up Link */}
      <View className="flex-row">
        <Text className="text-gray-700 text-base">New User? </Text>
        <Link href="/views/mechanic/sign_up" asChild>
          <TouchableOpacity>
            <Text className="text-blue-600 text-base font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}


