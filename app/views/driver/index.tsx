// app/views/mechanic/index.tsx
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";

export default function DriverHome() {
  return (
    <View className="flex-1 justify-center items-center bg-black px-6">
      {/* Image Placeholder */}
      <View className="w-72 h-72 bg-gray-200 justify-center items-center mb-6 rounded-lg">
        {/* Replace with <Image source={...} /> if you have an image */}
        <Text style={{ fontSize: 48, color: "#aaa" }}>🖼️</Text>
      </View>

      {/* Description */}
      <Text className="text-lg text-white mb-8 text-center">
        Seamlessly connect{"\n"}
        with trusted mechanics{"\n"}
        anytime, anywhere.
      </Text>

      {/* Login Button */}
      <Link href="/views/driver/#" asChild>
        <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-lg mb-4">
          <Text className="text-white font-medium text-base">Go to Login</Text>
        </TouchableOpacity>
      </Link>

      {/* Sign Up Link */}
      <View className="flex-row">
        <Text className="text-gray-700 text-base">New User? </Text>
        <Link href="/views/driver/#" asChild>
          <TouchableOpacity>
            <Text className="text-blue-600 text-base font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}


