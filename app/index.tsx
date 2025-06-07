import { Text, View, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <View className="flex-1 bg-gray-900 justify-center items-center px-6">
      <StatusBar style="dark" />

      {/* Logo */}
      <Image
        source={require("../assets/images/logo.png")} // Make sure logo.png is placed inside /assets folder
        className="w-60 h-60 mb-6"
        resizeMode="contain"
      />

      {/* App Name */}

      <Text className="text-base text-gray-600 mb-10 text-center">
        Empowering roadside assistance for mechanics and drivers
      </Text>

      {/* Role Selection */}
      <View className="w-full space-y-4">
        <Link href="/views/mechanic" asChild>
          <TouchableOpacity className="bg-blue-600 py-4 rounded-xl items-center shadow-lg">
            <Text className="text-white font-semibold text-base">Login as Mechanic</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/views/driver" asChild>
          <TouchableOpacity className="bg-green-600 py-4 rounded-xl items-center shadow-lg">
            <Text className="text-white font-semibold text-base">Login as Driver</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
