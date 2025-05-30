// app/views/mechanic/confirm_details.tsx
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function ConfirmDetails() {
  const router = useRouter();

  const handleSubmit = () => {
    // Simulate API call
    Alert.alert("Success", "Your account has been submitted for verification.");
    router.push("/views/mechanic/success");
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 24 }} className="bg-white flex-1">
      <Text className="text-xl font-bold text-blue-600 mb-6">Confirm Your Details</Text>

      {/* This is just static demo content. Ideally, fetch from context or state */}
      <View className="mb-4">
        <Text className="font-medium text-gray-800">Name:</Text>
        <Text className="text-gray-600">John Doe</Text>
      </View>

      <View className="mb-4">
        <Text className="font-medium text-gray-800">NIC Number:</Text>
        <Text className="text-gray-600">991234567V</Text>
      </View>

      <View className="mb-4">
        <Text className="font-medium text-gray-800">Mobile Number:</Text>
        <Text className="text-gray-600">+94 71 234 5678</Text>
      </View>

      <View className="mb-4">
        <Text className="font-medium text-gray-800">Specializations:</Text>
        <Text className="text-gray-600">Engine Repair, AC Repair</Text>
      </View>

      <View className="mb-8">
        <Text className="font-medium text-gray-800">NIC & Certification:</Text>
        <Text className="text-gray-600">Uploaded</Text>
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-green-600 py-3 rounded-lg"
      >
        <Text className="text-white text-center font-medium text-base">Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
