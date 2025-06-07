import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function MechanicHome() {
  return (
    <View className="flex-1 bg-white px-6 justify-center items-center">
      <StatusBar style="dark" />

      {/* Illustration */}
      <Image
        source={require("../../../assets/images/mechanic_hero.png")} // Replace with your actual image
        className="w-64 h-64 mb-6"
        resizeMode="contain"
      />

      {/* Headline */}
      <Text className="text-3xl font-bold text-blue-600 mb-2 text-center">
        Welcome, Mechanic!
      </Text>

      {/* Subtitle */}
      <Text className="text-base text-gray-600 text-center mb-10">
        Seamlessly connect with trusted drivers & grow your auto service business.
      </Text>

      {/* Login Button */}
      <Link href="/views/mechanic/login" asChild>
        <TouchableOpacity className="bg-blue-600 py-4 rounded-xl w-full items-center shadow-md mb-4">
          <Text className="text-white font-semibold text-base">Login</Text>
        </TouchableOpacity>
      </Link>

      {/* Divider text */}
      <Text className="text-gray-500 mb-2">or</Text>

      {/* Sign Up Button */}
      <Link href="/views/mechanic/sign_up_step1" asChild>
        <TouchableOpacity className="border border-blue-600 py-4 rounded-xl w-full items-center">
          <Text className="text-blue-600 font-semibold text-base">Create New Account</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
