import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ConfirmDetails() {
  const router = useRouter();

  const handleSubmit = () => {
    Alert.alert("Success", "Your account has been submitted for verification.");
    router.push("/views/mechanic/success");
  };

  const goBackToEdit = () => {
    router.push("/views/mechanic/sign_up_step1");
  };

  // TODO: Replace these static values with context or persistent state
  const mechanicDetails = {
    name: "John Doe",
    nic: "991234567V",
    mobile: "+94 71 234 5678",
    specializations: ["Engine Repair", "AC Repair"],
    certificateUploaded: true,
  };

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 32, paddingHorizontal: 20 }} className="bg-white flex-1">
      <Text className="text-2xl font-bold text-blue-600 mb-2">Review Your Information</Text>
      <Text className="text-gray-600 mb-6">Please make sure all the details below are correct before submitting.</Text>

      {/* Profile Info Card */}
      <View className="bg-gray-50 rounded-xl px-5 py-4 mb-4 shadow-sm border border-gray-200">
        <Text className="text-gray-500 text-sm">Full Name</Text>
        <Text className="text-gray-900 font-semibold text-base mb-3">{mechanicDetails.name}</Text>

        <Text className="text-gray-500 text-sm">NIC Number</Text>
        <Text className="text-gray-900 font-semibold text-base mb-3">{mechanicDetails.nic}</Text>

        <Text className="text-gray-500 text-sm">Mobile Number</Text>
        <Text className="text-gray-900 font-semibold text-base mb-3">{mechanicDetails.mobile}</Text>
      </View>

      {/* Specializations Card */}
      <View className="bg-gray-50 rounded-xl px-5 py-4 mb-4 shadow-sm border border-gray-200">
        <Text className="text-gray-500 text-sm mb-1">Selected Specializations</Text>
        <View className="flex flex-wrap flex-row gap-2 mt-2">
          {mechanicDetails.specializations.map((spec) => (
            <View
              key={spec}
              className="bg-blue-100 px-4 py-1 rounded-full"
            >
              <Text className="text-blue-800 font-medium text-sm">{spec}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Documents Card */}
      <View className="bg-gray-50 rounded-xl px-5 py-4 mb-6 shadow-sm border border-gray-200 flex-row items-center gap-3">
        <Ionicons name="document-text-outline" size={24} color="#4b5563" />
        <View>
          <Text className="text-gray-500 text-sm">NIC & Certification</Text>
          <Text className="text-gray-800 font-semibold text-base">
            {mechanicDetails.certificateUploaded ? "Uploaded" : "Not Uploaded"}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-green-600 py-4 rounded-xl mb-4"
      >
        <Text className="text-white text-center font-semibold text-base">Submit for Verification</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={goBackToEdit}
        className="border border-gray-300 py-3 rounded-xl flex-row justify-center items-center"
      >
        <Ionicons name="arrow-back" size={18} color="#4b5563" />
        <Text className="text-gray-700 ml-2 font-medium">Back to Edit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
