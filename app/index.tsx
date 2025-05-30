import { Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-blue-500 mb-6">AUTO ALERT</Text>
      <Link href="/views/mechanic" asChild>
              <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-lg mb-6">
                <Text className="text-white font-medium text-base">Go to Mechanic Login</Text>
              </TouchableOpacity>
      </Link>
      <Link href="/views/driver" asChild>
              <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-lg">
                <Text className="text-white font-medium text-base">Go to Driver Login</Text>
              </TouchableOpacity>
      </Link>
    </View>
  );
}
